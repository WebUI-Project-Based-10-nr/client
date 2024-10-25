import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import { useCallback } from 'react'
import { useModalContext } from '~/context/modal-context'
import { useTranslation } from 'react-i18next'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'
import Loader from '~/components/loader/Loader'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

const EmailConfirmModal = ({ confirmToken, openModal }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const serviceFunction = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { response, error, loading } = useAxios({
    service: serviceFunction,
    defaultResponse: null
  })

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (loading) {
    return <Loader size={100} />
  }

  const handleCloseModal = (event) => {
    event.stopPropagation()
    closeModal()
  }

  return (
    <Box onClick={(event) => event.stopPropagation()} sx={styles.box}>
      {error &&
      (error.code === 'BAD_CONFIRM_TOKEN' ||
        (error.code === 'DOCUMENT_NOT_FOUND' && response === null)) ? (
        <>
          <ImgTitleDescription
            description={t('modals.emailReject.badToken')}
            img={imgReject}
            style={styles}
            title={t('modals.emailNotConfirm')}
          />
          <Button
            onClick={handleCloseModal}
            sx={styles.button}
            variant='contained'
          >
            {t('common.confirmButton')}
          </Button>
        </>
      ) : error && error.code === 'EMAIL_ALREADY_CONFIRMED' ? (
        <>
          <ImgTitleDescription
            description={t('modals.emailReject.alreadyConfirmed')}
            img={imgReject}
            style={styles}
            title={t('modals.emailAlreadyConfirm')}
          />
          <Button
            onClick={openLoginDialog}
            sx={styles.button}
            variant='contained'
          >
            {t('common.confirmButton')}
          </Button>
        </>
      ) : null}
    </Box>
  )
}

export default EmailConfirmModal
