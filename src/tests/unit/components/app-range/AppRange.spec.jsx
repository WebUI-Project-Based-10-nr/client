import { screen, render, waitFor } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'
import AppRange from '~/components/app-range/AppRange'

const min = 50
const max = 500
const onValueChange = vi.fn()

describe('App range', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    render(<AppRange max={max} min={min} onChange={onValueChange} />)
  })

  it('should render correctly', () => {
    const inputElements = screen.getAllByRole('textbox')
    const sliderElements = screen.getAllByRole('slider')

    expect(inputElements.length).toBe(2)
    expect(sliderElements.length).toBeGreaterThan(0)
  })

  it('should call onChange when slider is moved', async () => {
    const sliderElements = screen.getAllByRole('slider')
    const testSlider = sliderElements[0]

    expect(testSlider).toBeInTheDocument()

    fireEvent.change(testSlider, { target: { value: '170' } })
    expect(testSlider).toHaveValue('170')

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalled()
    })
  })

  it('should call onChange when input is changed', async () => {
    const inputElements = screen.getAllByRole('textbox')
    const testInput = inputElements[0]

    await userEvent.type(testInput, '125')

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalled()
    })
  })

  it('should not call onChange when input is changed with not a number', async () => {
    const inputElements = screen.getAllByRole('textbox')
    const testInput = inputElements[0]

    await userEvent.type(testInput, 'Good day')

    await waitFor(() => {
      expect(onValueChange).not.toHaveBeenCalled()
    })
  })

  it('should call onChange with min number if input is empty', async () => {
    const inputElements = screen.getAllByRole('textbox')
    const testInput = inputElements[0]

    await userEvent.clear(testInput)

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith([min, max])
    })
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    const inputElements = screen.getAllByRole('textbox')
    const testInput = inputElements[0]
    const sliderElements = screen.getAllByRole('slider')
    const testSlider = sliderElements[0]

    await userEvent.clear(testInput)
    await userEvent.type(testInput, '700')
    await userEvent.tab()

    expect(testInput).toHaveValue('500')
    expect(testSlider).toHaveAttribute('max', '500')
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    const inputElements = screen.getAllByRole('textbox')
    const testInput = inputElements[0]

    let initialValue = '68'
    testInput.value = initialValue

    await userEvent.tab()

    await waitFor(() => {
      expect(onValueChange).not.toHaveBeenCalled()
    })
  })
})
