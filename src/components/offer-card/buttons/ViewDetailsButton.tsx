import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ButtonVariantEnum } from '~/types'
import AppButton from '~/components/app-button/AppButton'

const ViewDetailsButton = () => {
  const { t } = useTranslation()

  return (
    // TODO: add path to offer details
    <AppButton component={Link} fullWidth variant={ButtonVariantEnum.Tonal}>
      {t('common.labels.viewDetails')}
    </AppButton>
  )
}

export default ViewDetailsButton
