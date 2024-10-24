import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import ConfirmDialog from '../confirm-dialog/ConfirmDialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { DialogProps } from '@mui/material'
import question from '~/constants/translations/en/questions.json'
import title from '~/constants/translations/en/titles.json'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: DialogProps['PaperProps']
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay
}) => {
  const { isMobile } = useBreakpoints()
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()
  const handleClose = () => closeModalAfterDelay(0)

  const handleConfirm = () => {
    setConfirmDialogOpen(false)
    handleClose()
  }

  const handleDismiss = () => {

    setConfirmDialogOpen(false)
  }

  return (
    <>
      <Dialog
        PaperProps={paperProps}
        data-testid='popup'
        disableRestoreFocus
        fullScreen={isMobile}
        maxWidth='xl'
        onClose={handleClose}
        open={true} 
      >
        <Box
          data-testid='popupContent'
          onMouseLeave={handleMouseLeave}
          onMouseOver={handleMouseOver}
          sx={styles.box}
        >
          <IconButton onClick={() => setConfirmDialogOpen(true)} sx={styles.icon}>
            <CloseIcon />
          </IconButton>
          <Box sx={styles.contentWraper}>{content}</Box>
        </Box>
      </Dialog>
      <ConfirmDialog
        message= {question.unsavedChanges}
        title={title.confirmTitle}
        open={isConfirmDialogOpen}
        onConfirm={handleConfirm}
        onDismiss={handleDismiss}
      />
    </>
  )
}

export default PopupDialog
