import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

const title = 'Price'
const defaultValue = 8
const min = 0
const max = 100
const onChangeSlider = vi.fn()

let container

describe('SliderWithInput component', () => {
  beforeEach(() => {
    ;({ container } = render(
      <SliderWithInput
        defaultValue={defaultValue}
        max={max}
        min={min}
        onChange={onChangeSlider}
        title={title}
      />
    ))
  })

  afterEach(() => vi.clearAllMocks())

  it('should render correctly', () => {
    const titleText = screen.getByText(title)
    const slider = screen.getByRole('slider')
    const input = screen.getByRole('textbox')

    expect(titleText).toBeInTheDocument()
    expect(slider).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('8')

    await userEvent.type(slider, '50')
    expect(slider).toHaveValue('50')

    await waitFor(() => {
      expect(container.querySelector('span')).toBeDefined()
    })
    await waitFor(() => {
      expect(onChangeSlider).toHaveBeenCalled()
    })
  })

  it('should update inputValue correctly when input value is empty', async () => {
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('8')

    await userEvent.clear(input)
    expect(input).toHaveValue('')
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    const input = screen.getByRole('textbox')
    const slider = screen.getByRole('slider')

    await userEvent.clear(input)
    await userEvent.type(input, '150')
    await userEvent.tab()

    expect(input).toHaveValue('100')
    expect(slider).toHaveAttribute('max', '100')
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('8')

    await userEvent.clear(input)
    await userEvent.type(input, '48')
    await userEvent.tab()

    expect(input).toHaveValue('48')
  })
})
