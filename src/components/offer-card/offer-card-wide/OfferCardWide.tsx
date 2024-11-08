import { Box } from '@mui/material'
import { Offer } from '~/types'
import { styles } from '~/components/offer-card/offer-card-wide/OfferCardWide.styles'

import AppCard from '~/components/app-card/AppCard'
import BookmarkButton from '~/components/offer-card/buttons/bookmark-button/BookmarkButton'
import OfferDetails from '~/components/offer-card/offer-card-wide/offer-details/OfferDetails'
import Price from '~/components/offer-card/price/Price'
import SendMessageButton from '~/components/offer-card/buttons/SendMessageButton'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import ViewDetailsButton from '~/components/offer-card/buttons/ViewDetailsButton'

interface OfferCardProps {
  offer: Offer
  onBookmarkClick: (id: string) => void
  isBookmarked: boolean
}

const OfferCardWide: React.FC<OfferCardProps> = ({
  offer,
  onBookmarkClick,
  isBookmarked
}) => {
  const {
    _id,
    title,
    description,
    languages,
    price,
    author,
    authorRole,
    subject,
    category,
    proficiencyLevel
  } = offer

  const userProfileInfoProps = {
    _id: author._id,
    firstName: author.firstName,
    lastName: `${author.lastName[0]}.`,
    photo: author.photo,
    rating: author.averageRating[authorRole],
    reviewsCount: author.totalReviews[authorRole],
    role: authorRole,
    sx: styles.userInfo
  }
  const offerDetailsProps = {
    chipsColor: category.appearance.color,
    description,
    languages,
    level: proficiencyLevel,
    subject: subject.name,
    title
  }
  const bookmarkProps = {
    id: _id,
    isBookmarked,
    onBookmarkClick,
    style: styles.bookmarkButton
  }

  // TODO: add chat opening logic
  const handleChatOpening = () => {}

  return (
    <AppCard sx={styles.appCard}>
      <UserProfileInfo {...userProfileInfoProps} />

      <OfferDetails {...offerDetailsProps} />

      <Box>
        <Price price={price} />

        <Box sx={styles.buttons}>
          <ViewDetailsButton />

          <SendMessageButton onClick={handleChatOpening} />
        </Box>
      </Box>

      <BookmarkButton {...bookmarkProps} />
    </AppCard>
  )
}

export default OfferCardWide
