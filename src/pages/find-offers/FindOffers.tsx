import { useState } from 'react'
import { Box } from '@mui/material'
import useBreakpoints from '~/hooks/use-breakpoints'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { CardsViewMode } from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { isLaptopAndAbove } = useBreakpoints()
  const [viewMode, setViewMode] = useState<CardsViewMode>('list')

  return (
    <PageWrapper>
      <Box sx={styles.container}>
        {isLaptopAndAbove && (
          <ViewSwitcher onChange={setViewMode} viewMode={viewMode} />
        )}
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
