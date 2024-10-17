import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, vi } from 'vitest'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

const mockUpdateFilter = vi.fn()

vi.mock('~/components/input-with-icon/InputWithIcon', () => ({
  default: ({ value = '', onChange, onClear }) => (
    <div>
      <input onChange={(e) => onChange(e)} role='textbox' value={value} />
      <button data-testid='clearIcon' onClick={onClear}>
        Clear
      </button>
    </div>
  )
}))

const defaultProps = {
  updateFilter: mockUpdateFilter,
  textFieldProps: { placeholder: 'Search...' }
}

describe('SearchFilterInput', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('should render component with input in it', () => {
    render(<SearchFilterInput {...defaultProps} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should render typed text correctly', async () => {
    render(<SearchFilterInput {...defaultProps} />)

    const inputWithIcon = screen.getByRole('textbox')
    await user.type(inputWithIcon, 'some text')

    expect(inputWithIcon).toHaveValue('some text')
  })

  it('should delete typed text when delete button is clicked', async () => {
    render(<SearchFilterInput {...defaultProps} />)

    const input = screen.getByRole('textbox')
    const clearBtn = screen.getByTestId('clearIcon')
    await user.click(clearBtn)

    expect(input).toHaveValue('')
  })

  it('should call updateFilter function on search button click', async () => {
    render(<SearchFilterInput {...defaultProps} />)

    const inputWithIcon = screen.getByRole('textbox')
    const searchBtn = screen.getByRole('button', { name: /search/i })

    await user.type(inputWithIcon, 'test search')

    await user.click(searchBtn)

    expect(mockUpdateFilter).toHaveBeenCalledWith('test search')
  })

  it('should call updateFilter function when enter is pressed', async () => {
    render(<SearchFilterInput {...defaultProps} />)

    const inputWithIcon = screen.getByRole('textbox')

    await user.type(inputWithIcon, 'test search')
    await user.type(inputWithIcon, '{enter}')

    expect(mockUpdateFilter).toHaveBeenCalledWith('test search')
  })
})
