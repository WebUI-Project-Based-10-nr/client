import { useState } from 'react'
import { Box } from '@mui/material'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { CardsViewMode } from '~/types/find-offers/findOffers.index'
import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const [viewMode, setViewMode] = useState<CardsViewMode>('list')

  return (
    <PageWrapper>
      <Box sx={styles.container}>
        <ViewSwitcher onChange={setViewMode} viewMode={viewMode} />
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
