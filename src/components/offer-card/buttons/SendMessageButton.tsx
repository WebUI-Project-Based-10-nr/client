import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'

interface SendMessageButtonProps {
  handleChatOpening: () => void
}

const SendMessageButton = ({ handleChatOpening }: SendMessageButtonProps) => {
  const { t } = useTranslation()
  const label = t('common.labels.sendMessage')

  return (
    <AppButton fullWidth onClick={handleChatOpening}>
      {label}
    </AppButton>
  )
}

export default SendMessageButton
