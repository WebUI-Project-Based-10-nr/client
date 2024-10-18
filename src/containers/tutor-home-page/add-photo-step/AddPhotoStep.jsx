import { Box, Typography } from '@mui/material'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { useTranslation } from 'react-i18next'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={style.root}>
      <Box sx={style.rigthBox}>
        <Typography sx={style.description}>
          {t('becomeTutor.photo.description')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
