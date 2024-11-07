import { FC, ReactElement } from 'react'
import { Box } from '@mui/material'

import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/notification-modal/NotificationModal.styles'
import PopupDialog from '~/components/popup-dialog/PopupDialog'

interface ConfirmEmailModal {
  description: string | ReactElement
  buttonTitle: string
  title: string
  img: string
  onClose: () => void
}

const NotificationModal: FC<ConfirmEmailModal> = ({
  description,
  buttonTitle,
  title,
  img,
  onClose
}) => {
  return (
    <PopupDialog
      closeModalAfterDelay={onClose}
      closeOnly
      content={
        <Box sx={styles.root}>
          <ImgTitleDescription
            description={description}
            img={img}
            style={styles.imgTitleDesc}
            title={title}
          />
          <AppButton onClick={onClose}>{buttonTitle}</AppButton>
        </Box>
      }
      paperProps={{}}
      timerId={null}
    />
  )
}

export default NotificationModal
