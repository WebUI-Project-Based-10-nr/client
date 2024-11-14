import { Box } from '@mui/material'
import OfferCardNarrow from '~/components/offer-card/offer-card-narrow/OfferCardNarrow'
import { Offer } from '~/types'
import { styles } from '~/containers/find-offer/offer-cards-container/grid-offers/GridOffers.styles'

interface GridOffersProps {
  offers: Offer[]
}

const GridOffers: React.FC<GridOffersProps> = ({ offers }) => (
  <Box data-testid='grid-offers' sx={styles.container}>
    {offers.map((offer) => {
      return (
        <OfferCardNarrow
          isBookmarked
          key={offer._id}
          offer={offer}
          onBookmarkClick={() => {}}
        />
      )
    })}
  </Box>
)

export default GridOffers
