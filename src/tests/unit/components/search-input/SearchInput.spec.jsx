import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchInput from '~/components/search-input/SearchInput'

describe('Search by input', () => {
  it('should allow typing in the input field', async () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Hello world')
    expect(input).toHaveValue('Hello world')
  })

  it('should render correctly', () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='' setSearch={setSearchMock} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument()
  })

  it('should trigger search when clicking search icon', async () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')
    const searchIcon = screen.getByTestId('search-icon')

    await userEvent.type(input, 'Hello world')
    await userEvent.click(searchIcon)

    expect(setSearchMock).toHaveBeenCalledWith('Hello world')
  })

  it('should clear the input when clicking delete icon', async () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='Hello world' setSearch={setSearchMock} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    const input = screen.getByRole('textbox')

    await userEvent.click(deleteIcon)

    expect(input.value).toBe('')
    expect(setSearchMock).toHaveBeenCalledWith('')
  })

  it('should trigger search when pressing Enter key', async () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, 'Hello world')
    await userEvent.keyboard('{Enter}')

    expect(setSearchMock).toHaveBeenCalledWith('Hello world')
  })

  it('delete-icon should have hidden class if search is empty', () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='' setSearch={setSearchMock} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('delete-icon should have visible class if search is not empty', () => {
    const setSearchMock = vi.fn()
    render(<SearchInput search='Hello world' setSearch={setSearchMock} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })
})
