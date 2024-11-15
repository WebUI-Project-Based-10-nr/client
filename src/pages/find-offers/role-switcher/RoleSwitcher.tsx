import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { getOpositeRole } from '~/utils/helper-functions'
import { UserRole } from '~/types'
import { styles } from './RoleSwitcher.styles'

interface RoleSwitcherProps {
  currentRole: '' | UserRole
  onChange: (role: '' | UserRole) => void
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onChange
}) => {
  const { t } = useTranslation()

  const { userRole } = useAppSelector((state) => state.appMain)

  const translatedSwitcherOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers'),
      tooltip: t('findOffers.contentSwitcher.switcher-tutor')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests'),
      tooltip: t('findOffers.contentSwitcher.switcher-student')
    }
  }

  const switchRole = () => {
    const updatedRole = getOpositeRole(currentRole)
    onChange(updatedRole)
  }

  return (
    <AppContentSwitcher
      active={currentRole === userRole}
      onChange={switchRole}
      styles={styles}
      switchOptions={translatedSwitcherOptions}
      typographyVariant='button'
    />
  )
}

export default RoleSwitcher
