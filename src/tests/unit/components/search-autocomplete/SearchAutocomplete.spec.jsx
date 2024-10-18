import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

describe('SearchAutocomplete component', () => {
  const mockSetSearch = vi.fn()

  const suggestions = ['test', 'testing', 'topic', 'textbook', 'template']

  beforeEach(() => {
    vi.clearAllMocks()
    render(
      <SearchAutocomplete
        options={suggestions}
        search=''
        setSearch={mockSetSearch}
      />
    )
  })

  it('should render autocomplete on search input', async () => {
    const searchInput = screen.getByRole('combobox')
    expect(searchInput).toBeInTheDocument()

    await userEvent.type(searchInput, 'test')

    const autocompleteComponent = screen.getByRole('presentation')
    const autocompleteList = screen.getByRole('listbox')

    expect(autocompleteComponent).toBeInTheDocument()
    expect(autocompleteList).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
  })

  it('should update search input on typing', async () => {
    const searchInput = screen.getByRole('combobox')

    await userEvent.type(searchInput, 'Fra')
    expect(searchInput).toHaveValue('Fra')

    await userEvent.type(searchInput, 'nce')
    expect(searchInput).toHaveValue('France')
  })

  it('should filter options on typing', async () => {
    const searchInput = screen.getByRole('combobox')

    await userEvent.type(searchInput, 't')
    expect(searchInput).toHaveValue('t')

    const autocompleteList = screen.getByRole('listbox')

    expect(autocompleteList).toBeInTheDocument()
    expect(autocompleteList).toHaveTextContent('test')
    expect(autocompleteList).toHaveTextContent('testing')
    expect(autocompleteList).toHaveTextContent('topic')
    expect(autocompleteList).toHaveTextContent('textbook')
    expect(autocompleteList).toHaveTextContent('template')

    await userEvent.type(searchInput, 'e')

    expect(searchInput).toHaveValue('te')
    expect(autocompleteList).toHaveTextContent('test')
    expect(autocompleteList).toHaveTextContent('template')
    expect(autocompleteList).not.toHaveTextContent('topic')

    await userEvent.type(searchInput, 's')

    expect(searchInput).toHaveValue('tes')
    expect(autocompleteList).toHaveTextContent('test')
    expect(autocompleteList).toHaveTextContent('testing')
    expect(autocompleteList).not.toHaveTextContent('template')
  })

  it('should select an option on click', async () => {
    const searchInput = screen.getByRole('combobox')

    await userEvent.type(searchInput, 'te')

    const autocompleteList = screen.getByRole('listbox')

    expect(searchInput).toHaveValue('te')
    expect(autocompleteList).toBeInTheDocument()
    expect(autocompleteList).toHaveTextContent('test')
    expect(autocompleteList).toHaveTextContent('template')
    expect(autocompleteList).toHaveTextContent('textbook')

    const optionToBeClicked = await screen.findByRole('option', {
      name: 'testing'
    })

    await userEvent.click(optionToBeClicked)

    expect(searchInput.value).toBe('testing')
  })

  it('should clear search input on clear icon click', async () => {
    const searchInput = screen.getByRole('combobox')
    const clearButton = screen.getByTestId('clear-icon-button')

    await userEvent.type(searchInput, 'te')
    expect(searchInput.value).toBe('te')

    await userEvent.click(clearButton)
    expect(searchInput.value).toBe('')
  })

  it('should trigger search on search button click', async () => {
    const searchInput = screen.getByRole('combobox')
    const searchButton = screen.getByTestId('search-button')

    await userEvent.type(searchInput, 'test')
    await userEvent.click(searchButton)

    expect(mockSetSearch).toHaveBeenCalledWith('test')
  })
})
