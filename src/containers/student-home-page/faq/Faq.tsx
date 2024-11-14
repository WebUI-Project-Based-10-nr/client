import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { ExpandMoreRounded } from '@mui/icons-material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'
import Accordions from '~/components/accordion/Accordions'
import { accordionItems } from './accordionItems'
import { useState } from 'react'

const Faq = () => {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleAccordionChange = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />
      <Accordions
        activeIndex={activeIndex}
        descriptionVariant='body1'
        icon={<ExpandMoreRounded />}
        items={accordionItems.map((item) => ({
          title: t(item.title),
          description: t(item.description)
        }))}
        onChange={handleAccordionChange}
        titleVariant='h6'
      />
    </Box>
  )
}

export default Faq
