import { useState } from 'react'
import { useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import { Box } from '@mui/material'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import RoleSwitcher from '~/pages/find-offers/role-switcher/RoleSwitcher'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import { CardsViewMode, UserRole } from '~/types'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { getOpositeRole } from '~/utils/helper-functions'

const FindOffers = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const { isLaptopAndAbove } = useBreakpoints()

  const [viewMode, setViewMode] = useState<CardsViewMode>('list')

  const [currentOffersRole, setCurrentOffersRole] = useState<UserRole | ''>(
    getOpositeRole(userRole)
  )

  return (
    <PageWrapper>
      <Box sx={styles.container}>
        <Box sx={styles.right}>
          {isLaptopAndAbove && (
            <RoleSwitcher
              currentOffersRole={currentOffersRole}
              onChange={setCurrentOffersRole}
            />
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
