import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const fileUploadMock = vi.fn()

const imageResize = vi.fn(() => Promise.resolve('resized-image.png'))

const insertResizedImage = (resizedImg) => {
  const previewContainer = document.querySelector(
    '[data-testid="photo-preview"]'
  )
  previewContainer.innerHTML = `<img src="${resizedImg}" />`
}

const createFile = (size) => {
  const file = new File([], 'test.png', { type: 'image/png' })
  Object.defineProperty(file, 'size', {
    value: size
  })
  return file
}

const uploadFile = async (fileSize) => {
  const file = createFile(fileSize)
  const fileInput = screen.getByTestId('file-input')
  await userEvent.upload(fileInput, file)
}

const openPhotoStepPage = async () => {
  const AddPhotoStepBtn = screen.getByText('step.stepLabels.photo')
  await userEvent.click(AddPhotoStepBtn)
}

vi.mock('~/containers/tutor-home-page/add-photo-step/AddPhotoStep', () => ({
  default: ({ btnsBox }) => {
    const handleFileChange = async (event) => {
      const file = event.target.files[0]

      if (file.size > 50000) {
        fileUploadMock('fileSizeError')
      } else {
        const resizedImg = await imageResize(file)
        insertResizedImage(resizedImg)
        fileUploadMock('photoUploaded', resizedImg)
      }
    }

    return (
      <div>
        <input
          data-testid='file-input'
          onChange={handleFileChange}
          type='file'
        />
        AddPhoto Step
        <div data-testid='photo-preview'></div>
        {btnsBox}
      </div>
    )
  }
}))

describe('UserStepsWrapper', () => {
  beforeEach(() => {
    renderWithProviders(<UserStepsWrapper userRole='tutor' />)
  })

  afterEach(() => vi.clearAllMocks())

  it('should render the first tab', () => {
    const firstTab = screen.getByText(/becomeTutor.generalInfo.title/)
    expect(firstTab).toBeInTheDocument()
  })

  it('should render the second tab (Subjects step) after clicking Next', async () => {
    const nextButton = screen.getByText('common.next')
    await userEvent.click(nextButton)

    const secondTab = screen.getByText(/becomeTutor.categories.title/)
    expect(secondTab).toBeInTheDocument()
  })

  it('should open photo render error after adding a wrong file size', async () => {
    await openPhotoStepPage()

    await uploadFile(60000)
    expect(fileUploadMock).toHaveBeenCalledWith('fileSizeError')
  })

  it('should resize and show the photo after a valid file is uploaded', async () => {
    await openPhotoStepPage()

    await uploadFile(40000)
    expect(fileUploadMock).toHaveBeenCalledWith(
      'photoUploaded',
      'resized-image.png'
    )
    const photoPreview = await screen.findByRole('img')
    expect(photoPreview).toBeInTheDocument()
  })
})
