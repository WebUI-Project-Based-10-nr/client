import { screen, render } from '@testing-library/react'
import AppChipList from '~/components/app-chips-list/AppChipList'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('App chip list', () => {
  const items = ['1', '2', '3', '4', '5', '6', '7']

  const checkVisibleChips = (visibleItems) => {
    visibleItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  }

  const checkUnVisibleChips = (hiddenItems) => {
    hiddenItems.forEach((item) => {
      expect(screen.queryByText(item)).not.toBeInTheDocument()
    })
  }

  const splitChips = (visibleCount) => {
    const visibleChips = items.slice(0, visibleCount)
    const unVisibleChips = items.slice(visibleCount)

    return { visibleChips, unVisibleChips }
  }

  it('should show the correct number of visible chips', () => {
    render(<AppChipList defaultQuantity={3} items={items} />)
    const { visibleChips, unVisibleChips } = splitChips(3)

    checkVisibleChips(visibleChips)
    checkUnVisibleChips(unVisibleChips)
  })

  it('should show chip with +3', () => {
    render(<AppChipList defaultQuantity={4} items={items} />)

    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })

  it('should show only 7 chips', () => {
    render(<AppChipList defaultQuantity={7} items={items} />)

    checkVisibleChips(items)

    expect(screen.queryByTestId('amount-of-chips')).not.toBeInTheDocument()
  })

  it('displays all chips when popover is opened', async () => {
    render(<AppChipList defaultQuantity={3} items={items} />)
    const { visibleChips, unVisibleChips } = splitChips(3)

    checkVisibleChips(visibleChips)
    checkUnVisibleChips(unVisibleChips)

    await userEvent.click(screen.getByTestId('amount-of-chips'))
    checkVisibleChips(unVisibleChips)
  })

  it('calls handleChipDelete when a delete button is clicked', async () => {
    const mockHandleChipDelete = vi.fn()
    render(
      <AppChipList
        defaultQuantity={3}
        handleChipDelete={mockHandleChipDelete}
        items={items}
      />
    )
    const deleteButtons = screen.getAllByTestId('close-btn')

    await userEvent.click(deleteButtons[0])
    expect(mockHandleChipDelete).toHaveBeenCalledWith('1')
  })

  it('does not render delete buttons when handleChipDelete is not provided', () => {
    render(<AppChipList defaultQuantity={3} items={items} />)
    const deleteButtons = screen.queryAllByTestId('close-btn')
    expect(deleteButtons).toHaveLength(0)
  })
})
