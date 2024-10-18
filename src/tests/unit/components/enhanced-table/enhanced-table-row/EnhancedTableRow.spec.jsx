import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { renderWithProviders } from '~tests/test-utils'

const handleSelectClick = vi.fn()
const refetchData = vi.fn()
const calculatedCellValue = vi.fn()
const isSelected = vi.fn()

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

const openActionMenu = async () => {
  const menuIcon = screen.getByTestId('menu-icon')
  await userEvent.click(menuIcon)
}

const findDeleteMenuItem = async () => {
  const menuItem = await screen.findByText('Delete')
  expect(menuItem).toBeInTheDocument()
  return menuItem
}

describe('EnhancedTableRow component', () => {
  beforeEach(() => {
    renderRow()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the table row with correct data', () => {
    expect(screen.getByText(mockItem.name)).toBeInTheDocument()
    expect(calculatedCellValue).toHaveBeenCalledWith(
      mockItem,
      expect.anything()
    )
  })

  it('calls handleSelectClick when checkbox is clicked', async () => {
    isSelected.mockReturnValueOnce(false).mockReturnValueOnce(true)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toBeChecked()
    expect(checkbox.checked).toBe(
      isSelected(mockItem._id),
      'Checkbox should reflect isSelected state'
    )

    await userEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(checkbox.checked).toBe(
      isSelected(mockItem._id),
      'Checkbox should reflect updated isSelected state'
    )

    expect(handleSelectClick).toHaveBeenCalledWith(
      expect.anything(),
      mockItem._id
    )
  })

  it('opens the action menu when the menu icon is clicked', async () => {
    await openActionMenu()
    await findDeleteMenuItem()
  })

  it('triggers row action when clicking on the menu item', async () => {
    await openActionMenu()

    const menuItem = await findDeleteMenuItem()
    await userEvent.click(menuItem)

    expect(rowActions[0].func).toHaveBeenCalledWith(mockItem._id)
  })

  it('closes the menu when "Escape" is pressed', async () => {
    await openActionMenu()
    await findDeleteMenuItem()

    await userEvent.keyboard('{Escape}')

    expect(screen.queryByText('Delete')).toBeNull()
  })
})
