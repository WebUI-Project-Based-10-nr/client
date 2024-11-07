import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'

interface SendMessageButtonProps {
  onClick: () => void
}

const SendMessageButton = ({ onClick }: SendMessageButtonProps) => {
  const { t } = useTranslation()
  const label = t('common.labels.sendMessage')

  return (
    <AppButton fullWidth onClick={onClick}>
      {label}
    </AppButton>
  )
}

export default SendMessageButton
