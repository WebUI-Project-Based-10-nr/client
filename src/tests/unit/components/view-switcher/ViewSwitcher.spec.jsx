import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'

describe('ViewSwitcher Component', () => {
  const mockOnChange = vi.fn()
  const renderComponent = (viewMode) =>
    render(<ViewSwitcher onChange={mockOnChange} viewMode={viewMode} />)

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('renders the list and grid icon buttons', () => {
    renderComponent('list')
    expect(screen.getByTestId('list-view')).toBeInTheDocument()
    expect(screen.getByTestId('grid-view')).toBeInTheDocument()
  })

  test('list button is selected when viewMode is "list"', () => {
    renderComponent('list')
    const listButton = screen.getByTestId('list-view')
    const gridButton = screen.getByTestId('grid-view')

    expect(listButton).toHaveAttribute('aria-selected', 'true')
    expect(gridButton).toHaveAttribute('aria-selected', 'false')
  })

  test('grid button is selected when viewMode is "grid"', () => {
    renderComponent('grid')
    const listButton = screen.getByTestId('list-view')
    const gridButton = screen.getByTestId('grid-view')

    expect(listButton).toHaveAttribute('aria-selected', 'false')
    expect(gridButton).toHaveAttribute('aria-selected', 'true')
  })

  test('clicking on "grid" button triggers onChange with "grid" when viewMode is "list"', () => {
    renderComponent('list')
    const gridButton = screen.getByTestId('grid-view')

    fireEvent.click(gridButton)
    expect(mockOnChange).toHaveBeenCalledWith('grid')
  })

  test('clicking on "list" button triggers onChange with "list" when viewMode is "grid"', () => {
    renderComponent('grid')
    const listButton = screen.getByTestId('list-view')

    fireEvent.click(listButton)
    expect(mockOnChange).toHaveBeenCalledWith('list')
  })

  test('clicking the button corresponding to current viewMode does not trigger onChange', () => {
    renderComponent('list')
    const listButton = screen.getByTestId('list-view')

    fireEvent.click(listButton)
    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
