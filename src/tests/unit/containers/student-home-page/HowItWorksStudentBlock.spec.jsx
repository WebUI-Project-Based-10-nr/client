import { BrowserRouter as Router } from 'react-router-dom'
import { screen, render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authRoutes } from '~/router/constants/authRoutes'
import HowItWorksStudentBlock from '~/containers/student-home-page/student-how-it-works/HowItWorksStudentBlock'
import userEvent from '@testing-library/user-event'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => `translated-${key}`
  })
}))

describe('HowItWorksStudentBlock component', () => {
  beforeEach(() => {
    render(
      <Router>
        <HowItWorksStudentBlock />
      </Router>
    )
  })

  it('should render correctly', () => {
    const title = screen.getByText(
      'translated-studentHomePage.howItWorks.title'
    )
    const description = screen.getByText(
      'translated-studentHomePage.howItWorks.description'
    )
    const button = screen.getByText(
      'translated-studentHomePage.findTutorBlock.button'
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should render AppButton with correct link', () => {
    const button = screen.getByRole('link', {
      name: 'translated-studentHomePage.findTutorBlock.button'
    })

    expect(button).toHaveAttribute('href', authRoutes.findOffers.path)
  })

  it('should navigate to the correct route when AppButton is clicked', async () => {
    const button = screen.getByRole('link', {
      name: 'translated-studentHomePage.findTutorBlock.button'
    })

    await userEvent.click(button)

    expect(window.location.pathname).toBe('/categories/subjects/find-offers')
  })
})
