import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import OfferCardsContainer from '~/containers/find-offer/offer-cards-container/OfferCardsContainer'
import useBreakpoints from '~/hooks/use-breakpoints'

vi.mock('~/hooks/use-breakpoints')

const mockOffers = [
  {
    _id: '123456',
    title: 'Math for beginners',
    author: {
      firstName: 'John',
      lastName: 'Doe',
      averageRating: 4.5,
      totalReviews: 20
    },
    category: {
      appearance: { color: '#FFD700' }
    },
    subject: {
      name: 'Math'
    }
  },
  {
    _id: '123457',
    title: 'Physics for beginners',
    author: {
      _id: '66bdce96f0d7edf34088ed58',
      firstName: 'John',
      lastName: 'Doe',
      averageRating: 4.5,
      totalReviews: 20
    },
    category: {
      appearance: { color: '#FFD700' }
    },
    subject: {
      name: 'Physics'
    }
  }
]

describe('OfferCardsContainer', () => {
  it('renders GridOffers when on mobile or grid view mode', () => {
    useBreakpoints.mockReturnValue({ isMobile: true, isLaptopAndAbove: false })
    render(
      <BrowserRouter>
        <OfferCardsContainer offers={mockOffers} viewMode='grid' />
      </BrowserRouter>
    )

    expect(screen.getByTestId('grid-offers')).toBeInTheDocument()
    expect(screen.queryByTestId('list-offers')).not.toBeInTheDocument()
  })

  it('renders GridOffers when in grid view mode and not mobile', () => {
    useBreakpoints.mockReturnValue({ isMobile: false, isLaptopAndAbove: true })
    render(
      <BrowserRouter>
        <OfferCardsContainer offers={mockOffers} viewMode='grid' />
      </BrowserRouter>
    )

    expect(screen.getByTestId('grid-offers')).toBeInTheDocument()
    expect(screen.queryByTestId('list-offers')).not.toBeInTheDocument()
  })

  it('renders ListOffers when in list view mode on laptop and above', () => {
    useBreakpoints.mockReturnValue({ isMobile: false, isLaptopAndAbove: true })
    render(
      <BrowserRouter>
        <OfferCardsContainer offers={mockOffers} viewMode='list' />
      </BrowserRouter>
    )

    expect(screen.getByTestId('list-offers')).toBeInTheDocument()
    expect(screen.queryByTestId('grid-offers')).not.toBeInTheDocument()
  })
})
