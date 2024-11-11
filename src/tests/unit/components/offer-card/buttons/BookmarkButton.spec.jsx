import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Bookmark from '~/components/offer-card/buttons/bookmark-button/BookmarkButton'

const mockOnBookmarkClick = vi.fn()

const defaultProps = {
  id: '123',
  onBookmarkClick: mockOnBookmarkClick,
  style: {}
}

describe('Bookmark', () => {
  it('renders the TurnedInNot icon when isBookmarked is false', () => {
    render(<Bookmark {...defaultProps} isBookmarked={false} />)

    const bookmarkButton = screen.getByTestId('bookmark-button')
    expect(bookmarkButton).toContainElement(
      screen.getByTestId('TurnedInNotIcon')
    )
  })

  it('renders the TurnedIn icon when isBookmarked is true', () => {
    render(<Bookmark {...defaultProps} isBookmarked />)

    const bookmarkButton = screen.getByTestId('bookmark-button')
    expect(bookmarkButton).toContainElement(screen.getByTestId('TurnedInIcon'))
  })

  it('calls onBookmarkClick with the correct id when clicked', async () => {
    render(<Bookmark {...defaultProps} isBookmarked={false} />)
    const bookmarkButton = screen.getByTestId('bookmark-button')

    await userEvent.click(bookmarkButton)

    expect(mockOnBookmarkClick).toHaveBeenCalledWith(defaultProps.id)
  })
})
