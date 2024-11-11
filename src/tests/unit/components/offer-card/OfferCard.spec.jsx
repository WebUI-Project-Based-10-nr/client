import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import OfferCardNarrow from '~/components/offer-card/offer-card-narrow/OfferCardNarrow'
import OfferCardWide from '~/components/offer-card/offer-card-wide/OfferCardWide'

const mockOffer = {
  _id: '123',
  title: 'Offer title',
  price: 100,
  author: {
    _id: 'author123',
    firstName: 'John',
    lastName: 'Doe',
    totalReviews: { Tutor: 10 },
    averageRating: { Tutor: 4.5 }
  },
  authorRole: 'Tutor',
  subject: { name: 'Mathematics' },
  category: { appearance: { color: '#0000ff' } },
  proficiencyLevel: 'Intermediate'
}
const mockOnBookmarkClick = vi.fn()
const isBookmarked = false

const components = [
  { name: 'OfferCardNarrow', Component: OfferCardNarrow },
  { name: 'OfferCardWide', Component: OfferCardWide }
]

components.forEach(({ name, Component }) => {
  describe(name, () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Component
            isBookmarked={isBookmarked}
            offer={mockOffer}
            onBookmarkClick={mockOnBookmarkClick}
          />
        </MemoryRouter>
      )
    })

    it('renders the offer card with correct information', () => {
      expect(screen.getByText(mockOffer.title)).toBeInTheDocument()

      expect(
        screen.getByText(
          name === 'OfferCardWide'
            ? `${mockOffer.author.firstName} ${mockOffer.author.lastName[0]}.`
            : `${mockOffer.author.firstName} ${mockOffer.author.lastName}`
        )
      ).toBeInTheDocument()

      expect(screen.getByText(mockOffer.subject.name)).toBeInTheDocument()

      expect(
        screen.getByText(`${mockOffer.price} common.uah`)
      ).toBeInTheDocument()
    })

    it('calls onBookmarkClick when the bookmark button is clicked', async () => {
      const bookmarkButton = screen.getByTestId('bookmark-button')

      await userEvent.click(bookmarkButton)

      expect(mockOnBookmarkClick).toHaveBeenCalledWith(mockOffer._id)
    })

    it('displays the correct author rating and reviews', () => {
      expect(screen.getByText('4.5')).toBeInTheDocument()

      expect(
        screen.getByText('tutorProfilePage.reviews.reviewsCount')
      ).toBeInTheDocument()
    })

    it('renders buttons for viewing details and sending a message', () => {
      expect(
        screen.getByRole('button', { name: /common.labels.viewDetails/ })
      ).toBeInTheDocument()

      expect(
        screen.getByRole('button', { name: /common.labels.sendMessage/ })
      ).toBeInTheDocument()
    })
  })
})
