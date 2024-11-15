import { useState } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import { Box } from '@mui/material'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import RoleSwitcher from '~/pages/find-offers/role-switcher/RoleSwitcher'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { CardsViewMode, UserRole } from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'

const FindOffers = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const { isLaptopAndAbove } = useBreakpoints()

  const [viewMode, setViewMode] = useState<CardsViewMode>('list')
  const [currentRole, setCurrentRole] = useState<UserRole | ''>(userRole)

  return (
    <PageWrapper>
      <Box sx={styles.container}>
        <Box sx={styles.right}>
          {isLaptopAndAbove && (
            <RoleSwitcher currentRole={currentRole} onChange={setCurrentRole} />
          )}
        </Box>

        {isLaptopAndAbove && (
          <ViewSwitcher onChange={setViewMode} viewMode={viewMode} />
        )}
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
