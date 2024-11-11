import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'

interface SendMessageButtonProps {
  onClick: () => void
}

const SendMessageButton = ({ onClick }: SendMessageButtonProps) => {
  const { t } = useTranslation()

  return (
    <AppButton fullWidth onClick={onClick}>
      {t('common.labels.sendMessage')}
    </AppButton>
  )
}

export default SendMessageButton
