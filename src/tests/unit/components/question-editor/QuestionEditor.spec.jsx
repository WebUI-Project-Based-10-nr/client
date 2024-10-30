import { expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()
const onCancel = vi.fn()
const onEdit = vi.fn()
const onSave = vi.fn()

const props = {
  handleInputChange,
  handleNonInputValueChange,
  onCancel,
  onEdit,
  onSave,
  isQuizQuestion: true
}

describe('QuestionEditor component with open answer type', () => {
  const openQuestionData = {
    type: 'openAnswer',
    text: 'Sample question text',
    openAnswer: 'Sample open answer',
    answers: []
  }

  const openQuestionProps = {
    ...props,
    data: openQuestionData
  }

  beforeEach(() => {
    render(<QuestionEditor {...openQuestionProps} />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render question input field', () => {
    const questionInput = screen.getByLabelText('questionPage.question')
    expect(questionInput).toBeInTheDocument()
  })

  it('should render open answer field', () => {
    const openAnswerInput = screen.getByLabelText('questionPage.answer')
    expect(openAnswerInput).toBeInTheDocument()
  })

  it('should change question type', () => {
    const selectElement = screen.getByTestId('app-select')
    fireEvent.click(selectElement)
    fireEvent.change(selectElement, {
      target: { value: 'oneAnswer' }
    })
    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('should change question and answer input fields', async () => {
    const questionInput = screen.getByLabelText('questionPage.question')
    await userEvent.type(questionInput, 'New question')
    expect(handleInputChange).toHaveBeenCalledWith('text')

    const answerInput = screen.getByLabelText('questionPage.answer')
    await userEvent.type(answerInput, 'New answer')
    expect(handleInputChange).toHaveBeenCalledWith('openAnswer')
  })

  it('should click on edit title and category', async () => {
    const moreVertIcon = screen.getByTestId('MoreVertIcon')
    await userEvent.click(moreVertIcon)
    const editIcon = screen.getByTestId('EditIcon')
    await userEvent.click(editIcon)
    expect(onEdit).toHaveBeenCalled()
  })
})
