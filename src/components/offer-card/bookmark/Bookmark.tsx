import { IconButton } from '@mui/material'
import { TurnedIn, TurnedInNot } from '@mui/icons-material'
import { styles } from './Bookmark.styles'

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
    <IconButton
      data-testid='iconButton'
      onClick={() => onBookmarkClick(id)}
      sx={styles.bookmarkButton}
    >
      {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
    </IconButton>
  )
}

export default Bookmark
