import { Box } from '@mui/material'
import { styles } from './StepImage.styles'

interface StepImageProps {
  img: string
}

const StepImage = ({ img }: StepImageProps) => {
  return (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )
}

export default StepImage
