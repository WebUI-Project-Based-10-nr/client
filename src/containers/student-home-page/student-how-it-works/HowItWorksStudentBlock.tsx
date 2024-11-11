import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

import { authRoutes } from '~/router/constants/authRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import { howItWorksCards } from './HowItWorksCards'
import { styles } from './HowItWorksStudentBlock.styles'

const HowItWorksStudentBlock = () => {
  const { t } = useTranslation()

  const cards = howItWorksCards.map((item) => {
    return (
      <Box key={item.title} sx={styles.card}>
        <Box component='img' src={item.image} />
        <TitleWithDescription
          description={t(item.description)}
          style={styles.cardTitleWithDescription}
          title={t(item.title)}
        />
      </Box>
    )
  })

  return (
    <Box className='section' sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.howItWorks.description')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.howItWorks.title')}
      />
      <Box sx={styles.list}>{cards}</Box>
      <AppButton component={Link} to={`${authRoutes.findOffers.path}`}>
        {t('studentHomePage.findTutorBlock.button')}
      </AppButton>
    </Box>
  )
}

export default HowItWorksStudentBlock
