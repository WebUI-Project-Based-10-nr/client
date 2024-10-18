import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.container}>
      <Box component='form' sx={styles.form}>
        <Box>
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
