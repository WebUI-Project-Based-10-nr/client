import { Box } from '@mui/material'
import OfferCardWide from '~/components/offer-card/offer-card-wide/OfferCardWide'
import { Offer } from '~/types'

interface ListOffersProps {
  offers: Offer[]
}

const ListOffers: React.FC<ListOffersProps> = ({ offers }) => (
  <Box>
    {offers.map((offer) => {
      return (
        <OfferCardWide
          isBookmarked={false}
          key={offer._id}
          offer={offer}
          onBookmarkClick={() => {}}
        />
      )
    })}
  </Box>
)

export default ListOffers
