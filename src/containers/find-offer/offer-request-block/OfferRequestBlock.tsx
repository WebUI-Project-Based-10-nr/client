import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import { UserRoleEnum } from '~/types'
import { useDrawer } from '~/hooks/use-drawer'
import useBreakpoints from '~/hooks/use-breakpoints'

import AppButton from '~/components/app-button/AppButton'
import CreateOfferRequest from '../create-offer-request/CreateOfferRequest'
import TitleBlock from '~/components/title-block/TitleBlock'
import icon from '~/assets/img/find-offer/subject_icon.png'
import AppDrawer from '~/components/app-drawer/AppDrawer'

const translationKey = 'findOffers.offerRequestBlock'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const userRole = useAppSelector((state) => state.appMain.userRole)
  const buttonText =
    userRole === UserRoleEnum.Student
      ? `${translationKey}.button.student`
      : `${translationKey}.button.tutor`

  return (
    <TitleBlock img={icon} translationKey={translationKey}>
      <AppButton
        fullWidth={isMobile}
        onClick={() => openDrawer()}
        sx={{ py: '14px' }}
      >
        {t(buttonText)}
      </AppButton>

      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <CreateOfferRequest />
      </AppDrawer>
    </TitleBlock>
  )
}

export default OfferRequestBlock
