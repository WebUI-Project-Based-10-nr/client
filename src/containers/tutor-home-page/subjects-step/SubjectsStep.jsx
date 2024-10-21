import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()

  const imageBlock = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={img} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageBlock}
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && imageBlock}
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
