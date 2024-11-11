import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import infoImg from '~/assets/img/guest-home-page/info.svg'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import HashLink from '~/components/hash-link/HashLink'
import useInputVisibility from '~/hooks/use-input-visibility'
import NotificationModal from '../notification-modal/NotificationModal'
import { guestRoutes } from '~/router/constants/guestRoutes'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'
import { useModalContext } from '~/context/modal-context'

const SignupForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()
  const { closeModal, openModal } = useModalContext()
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const { authLoading } = useSelector((state) => state.appMain)

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const handleOnAgreementChange = () => {
    setIsAgreementChecked(!isAgreementChecked)
  }

  const infoPopupDescription = (
    <>
      {t('signup.confirmEmailMessage')} <strong>{data.email}</strong>{' '}
      {t('signup.confirmEmailDesc')}
    </>
  )

  const handleSignupSubmit = () => {
    handleSubmit()
    openModal({
      component: (
        <NotificationModal
          buttonTitle={t('common.confirmButton')}
          description={infoPopupDescription}
          img={infoImg}
          onClose={closeModal}
          title={t('signup.confirmEmailTitle')}
        />
      )
    })
  }

  const { privacyPolicy, termOfUse } = guestRoutes

  const isButtonDisabled = useMemo(() => {
    const hasAllValues = Object.values(data).every((value) => value)
    const hasNoErrors = Object.values(errors).every((error) => !error)
    return !(hasAllValues && hasNoErrors && isAgreementChecked)
  }, [data, errors, isAgreementChecked])

  const agreement = (
    <Box sx={styles.agreement}>
      <Typography variant='subtitle2'>{t('signup.iAgree')}</Typography>
      <Typography
        component={HashLink}
        sx={styles.underlineText}
        target='_blank'
        to={termOfUse.path}
        variant='subtitle2'
      >
        {t('signup.terms')}
      </Typography>
      <Typography sx={{ ml: '5px' }} variant='subtitle2'>
        {t('signup.and')}
      </Typography>
      <Typography
        component={HashLink}
        sx={styles.underlineText}
        target='_blank'
        to={privacyPolicy.path}
        variant='subtitle2'
      >
        {t('signup.privacyPolicy')}
      </Typography>
    </Box>
  )

  return (
    <Box component='form' onSubmit={handleSignupSubmit}>
      <Box sx={styles.namesContainer}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>
      <AppTextField
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        sx={{ mb: '5px' }}
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        sx={{ mb: '5px' }}
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />
      <Box sx={styles.checkboxContainer}>
        <FormControlLabel
          control={<Checkbox />}
          label={agreement}
          labelPlacement='end'
          onChange={handleOnAgreementChange}
          value={isAgreementChecked}
        />
      </Box>

      <AppButton
        disabled={isButtonDisabled}
        loading={authLoading}
        sx={styles.signupButton}
        type='submit'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
