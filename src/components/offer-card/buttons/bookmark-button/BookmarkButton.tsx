import { IconButton } from '@mui/material'
import { TurnedIn, TurnedInNot } from '@mui/icons-material'
import { styles } from '~/components/offer-card/buttons/bookmark-button/BookmarkButton.styles'

interface BookmarkProps {
  id: string
  isBookmarked: boolean
  onBookmarkClick: (id: string) => void
  style: object
}

const Bookmark: React.FC<BookmarkProps> = ({
  id,
  isBookmarked,
  onBookmarkClick,
  style
}) => {
  return (
    <IconButton
      data-testid='bookmark-button'
      onClick={() => onBookmarkClick(id)}
      sx={{ ...styles.bookmarkButton, ...style }}
    >
      {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
    </IconButton>
  )
}

export default Bookmark
