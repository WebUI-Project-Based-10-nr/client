import { Box, Divider, Typography } from '@mui/material'
import { Offer } from '~/types'
import { styles } from './OfferCardNarrow.styles'

import AppCard from '~/components/app-card/AppCard'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import BookmarkButton from '~/components/offer-card/buttons/bookmark-button/BookmarkButton'
import Price from '~/components/offer-card/price/Price'
import SendMessageButton from '~/components/offer-card/buttons/SendMessageButton'
import SubjectLevelWithlabels from '~/components/subject-level-with-labels/SubjectLevelWithLabels'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import ViewDetailsButton from '~/components/offer-card/buttons/ViewDetailsButton'

interface OfferCardProps {
  offer: Offer
  onBookmarkClick: (id: string) => void
  isBookmarked: boolean
}

const OfferCardSquare: React.FC<OfferCardProps> = ({
  offer,
  onBookmarkClick,
  isBookmarked
}) => {
  const {
    _id,
    title,
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
    languages,
    lastName: author.lastName,
    photo: author.photo,
    role: authorRole,
    sx: styles.userInfo
  }

  const bookmarkProps = {
    id: _id,
    isBookmarked,
    onBookmarkClick
  }

  // TODO: add chat opening logic
  const handleChatOpening = () => {}

  return (
    <AppCard sx={styles.appCard}>
      <Box sx={styles.container}>
        <BookmarkButton {...bookmarkProps} />

        <UserProfileInfo {...userProfileInfoProps} />

        <Typography sx={styles.description}>{title}</Typography>

        <Divider />

        <SubjectLevelWithlabels
          color={category.appearance.color}
          proficiencyLevel={proficiencyLevel}
          subject={subject.name}
        />

        <Box sx={styles.cardContent}>
          <Box sx={styles.priceContainer}>
            <Price price={price} />

            <AppRatingMobile
              reviewsCount={author.totalReviews[authorRole]}
              value={author.averageRating[authorRole]}
            />
          </Box>

          <Box sx={styles.buttonContainer}>
            <ViewDetailsButton />

            <SendMessageButton onClick={handleChatOpening} />
          </Box>
        </Box>
      </Box>
    </AppCard>
  )
}

export default OfferCardSquare
