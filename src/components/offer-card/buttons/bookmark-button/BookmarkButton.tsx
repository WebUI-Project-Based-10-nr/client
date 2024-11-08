import { IconButton } from '@mui/material'
import { TurnedIn, TurnedInNot } from '@mui/icons-material'
import { styles } from '~/components/offer-card/buttons/bookmark-button/BookmarkButton.styles'

interface BookmarkProps {
  id: string
  isBookmarked: boolean
  onBookmarkClick: (id: string) => void
}

const Bookmark: React.FC<BookmarkProps> = ({
  id,
  isBookmarked,
  onBookmarkClick
}) => {
  return (
    <IconButton onClick={() => onBookmarkClick(id)} sx={styles.bookmarkButton}>
      {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
    </IconButton>
  )
}

export default Bookmark
