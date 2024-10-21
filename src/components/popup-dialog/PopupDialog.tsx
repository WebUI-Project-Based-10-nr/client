import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { PaperProps } from '@mui/material'
import common from '~/constants/translations/en/common.json'
import question from '~/constants/translations/en/questions.json'
import title from '~/constants/translations/en/titles.json'

import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
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
  const [showConfirm, setShowConfirm] = useState(false)

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()
  const handleClose = () => setShowConfirm(true)

  const confirmCloseHandler = () => {
    setShowConfirm(false)
    closeModalAfterDelay(0)
  }
  const cancelCloseHandler = () => setShowConfirm(false)

  return (
    <>
      <Dialog
        PaperProps={paperProps}
        data-testid='popup'
        disableRestoreFocus
        fullScreen={isMobile}
        maxWidth='xl'
        onClose={handleClose}
        open
      >
        <Box
          data-testid='popupContent'
          onMouseLeave={handleMouseLeave}
          onMouseOver={handleMouseOver}
          sx={styles.box}
        >
          <IconButton onClick={handleClose} sx={styles.icon}>
            <CloseIcon />
          </IconButton>
          <Box sx={styles.contentWraper}>{content}</Box>
        </Box>
      </Dialog>
      <Dialog
        PaperProps={{
          style: styles.dialogPaper
        }}
        aria-describedby='confirm-dialog-description'
        aria-labelledby='confirm-dialog-title'
        onClose={cancelCloseHandler}
        open={showConfirm}
      >
        <Box sx={styles.box}>
          <Typography
            id='confirm-dialog-title'
            sx={styles.dialogTitle}
            variant='h6'
          >
            {title.confirmTitle}
          </Typography>
          <IconButton onClick={cancelCloseHandler} sx={styles.icon}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography
          id='confirm-dialog-description'
          sx={styles.dialogDescription}
        >
          {question.unsavedChanges}
        </Typography>
        <Box sx={styles.buttonContainer}>
          <Button
            color='primary'
            onClick={confirmCloseHandler}
            sx={styles.yesButton}
            variant='contained'
          >
            {common.yes}
          </Button>
          <Button
            color='secondary'
            onClick={cancelCloseHandler}
            sx={styles.noButton}
            variant='outlined'
          >
            {common.no}
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

export default PopupDialog
