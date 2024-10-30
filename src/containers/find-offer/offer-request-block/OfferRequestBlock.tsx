import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import useBreakpoints from '~/hooks/use-breakpoints'

import AppButton from '~/components/app-button/AppButton'
import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'

const translationKey = 'findOffers.offerRequestBlock'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const userRole = useAppSelector((state) => state.appMain.userRole)
  const buttonText =
    userRole === UserRoleEnum.Student
      ? `${translationKey}.button.student`
      : `${translationKey}.button.tutor`

  const openPopup = () => {} // TODO: add "Create offer/request" popup

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton fullWidth={isMobile} onClick={openPopup} sx={{ py: '14px' }}>
        {t(buttonText)}
      </AppButton>
    </TitleBlock>
  )
}

export default OfferRequestBlock
