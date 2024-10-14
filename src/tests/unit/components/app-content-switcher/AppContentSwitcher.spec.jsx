import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'

const mockOnChange = vi.fn()
const switchOptions = {
  left: { text: 'Text 1', tooltip: 'This is Text 1' },
  right: { text: 'Text 2', tooltip: 'This is Text 2' }
}

const renderSwitcher = (active = false) => {
  return render(
    <AppContentSwitcher
      active={active}
      onChange={mockOnChange}
      styles={defaultStyles}
      switchOptions={switchOptions}
      typographyVariant='h6'
    />
  )
}

describe('AppContentSwitcher', () => {
  beforeAll(() => {
    vi.clearAllMocks()
  })

  it('should render with the correct props', () => {
    renderSwitcher(true)

    const firstText = screen.getByText('Text 1')
    const secondText = screen.getByText('Text 2')
    const switchElement = screen.getByTestId('switch').querySelector('input')

    expect(firstText).toBeInTheDocument()
    expect(secondText).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
    expect(switchElement.checked).toBe(true)
  })

  it('should call the onChange function when the switch is clicked', async () => {
    renderSwitcher()

    const switchElement = screen.getByTestId('switch').querySelector('input')
    expect(switchElement.checked).toBe(false)

    await userEvent.click(switchElement)
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    renderSwitcher(true)

    const firstText = screen.getByText('Text 1')
    const secondText = screen.getByText('Text 2')

    await userEvent.hover(firstText)
    expect(await screen.findByText('This is Text 1')).toBeInTheDocument()

    await userEvent.unhover(firstText)

    await userEvent.hover(secondText)
    expect(await screen.findByText('This is Text 2')).toBeInTheDocument()
  })
})
