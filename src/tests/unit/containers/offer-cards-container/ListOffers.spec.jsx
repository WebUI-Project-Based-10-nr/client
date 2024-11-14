import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ListOffers from '~/containers/find-offer/offer-cards-container/list-offers/ListOffers'

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

describe('ListOffers', () => {
  it('renders the correct number of OfferCardWide components', () => {
    render(
      <BrowserRouter>
        <ListOffers offers={mockOffers} />
      </BrowserRouter>
    )

    expect(screen.getByText('Math for beginners')).toBeInTheDocument()
    expect(screen.getByText('Physics for beginners')).toBeInTheDocument()
  })
})
