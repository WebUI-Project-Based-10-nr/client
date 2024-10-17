import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { renderWithProviders } from '~tests/test-utils'

const handleSelectClick = vi.fn()
const refetchData = vi.fn()
const calculatedCellValue = vi.fn()
const isSelected = vi.fn().mockReturnValue(false)

const mockItem = {
  _id: '123456789',
  name: 'Test',
  email: 'test@email.com',
  lastLogin: '2024-10-17'
}

const columns = [
  { label: 'name', field: 'name' },
  { label: 'email', field: 'email' },
  { label: 'login', field: 'last login', calculatedCellValue }
]

const rowActions = [{ label: 'Delete', func: vi.fn() }]

const renderRow = () =>
  renderWithProviders(
    <table>
      <tbody>
        <EnhancedTableRow
          columns={columns}
          isSelection
          item={mockItem}
          refetchData={refetchData}
          rowActions={rowActions}
          select={{ isSelected, handleSelectClick }}
        />
      </tbody>
    </table>
  )

describe('EnhancedTableRow component', () => {
  beforeEach(() => {
    renderRow()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the table row with correct data', () => {
    expect(screen.getByText(mockItem.name)).toBeInTheDocument()
    expect(calculatedCellValue).toHaveBeenCalled()
  })

  it('calls handleSelectClick when checkbox is clicked', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(handleSelectClick).toHaveBeenCalled()
  })

  it('opens the action menu when the menu icon is clicked', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    const menuItem = await screen.findByText('Delete')
    expect(menuItem).toBeInTheDocument()
  })

  it('triggers row action when clicking on the menu item', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    const menuItem = await screen.findByText('Delete')
    await userEvent.click(menuItem)

    expect(rowActions[0].func).toHaveBeenCalledWith(mockItem._id)
  })

  it('closes the menu when "Escape" is pressed', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    const menuItem = screen.queryByText('Delete')
    expect(menuItem).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    expect(screen.queryByText('Delete')).toBeNull()
  })
})
