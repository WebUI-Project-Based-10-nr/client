import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~/tests/test-utils'
import { URLs } from '~/constants/request'

const lessonMock = {
  _id: '671fb8ca2842fb1f99189ae5',
  author: '670d3b3084006895f7ef2884',
  title: 'Test title',
  description: 'Test description',
  content: 'Test text',
  attachments: ['671bed09f3246c991ef5c844', '671bed09f3246c991ef5c844'],
  createdAt: '2024-11-09T17:55:12.725Z',
  updatedAt: '2024-11-09T18:43:27.166Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, ind) => ({
    ...lessonMock,
    _id: ind,
    title: ind + lessonMock.title
  }))

const lessonResponseMock = {
  count: 10,
  items: responseItemsMock
}

const responseItemsMockCategory = Array(10)
  .fill()
  .map((_, ind) => ({
    ...lessonMock,
    _id: ind,
    title: ind + lessonMock.title,
    category: { _id: '670fa23a68036f30d080aaf2', name: 'mmm1' + ind }
  }))

const lessonResponseMockCategory = {
  count: 10,
  items: responseItemsMockCategory
}

describe('LessonContainer test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMock)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('render "New lesson" button', () => {
    const addBtn = screen.getByText('myResourcesPage.lessons.addBtn')

    expect(addBtn).toBeInTheDocument()
  })

  it('should render table with lessons', async () => {
    const columnLabel = await screen.findByText('myResourcesPage.lessons.title')

    const lessonTitle = await screen.findByText(responseItemsMock[5].title)

    expect(columnLabel).toBeInTheDocument()
    expect(lessonTitle).toBeInTheDocument()
  })
})

describe('LessonCategory test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      mockAxiosClient
        .onGet(URLs.resources.lessons.get)
        .reply(200, lessonResponseMockCategory)

      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('should render correct category', async () => {
    const category = await screen.findByText(
      'myResourcesPage.categories.category'
    )
    expect(category).toBeInTheDocument()

    const catergoryValue = await screen.findByText(
      responseItemsMockCategory[5].category.name
    )
    expect(catergoryValue).toBeInTheDocument()
  })
})
