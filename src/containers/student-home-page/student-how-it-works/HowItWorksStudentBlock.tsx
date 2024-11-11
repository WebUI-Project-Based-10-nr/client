import { useTranslation } from 'react-i18next'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { howItWorksCards } from './HowItWorksCards'
import { Box } from '@mui/material'
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
    </Box>
  )
}

export default HowItWorksStudentBlock
