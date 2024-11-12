import { FC } from 'react'
import useBreakpoints from '~/hooks/use-breakpoints'
import GridOffers from './grid-offers/GridOffers'
import ListOffers from './list-offers/ListOffers'
import { Offer } from '~/types'

interface OfferCardsContainerProps {
  viewMode: 'grid' | 'inline'
  offers: Offer[]
}

const OfferCardsContainer: FC<OfferCardsContainerProps> = ({
  viewMode,
  offers
}) => {
  const { isMobile, isLaptopAndAbove } = useBreakpoints()

  const isGrid = isMobile || (isLaptopAndAbove && viewMode === 'grid')

  return isGrid ? (
    <GridOffers offers={offers} />
  ) : (
    <ListOffers offers={offers} />
  )
}

export default OfferCardsContainer
