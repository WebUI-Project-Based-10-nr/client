import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { appApi } from '~/redux/apiSlice'

import { URLs } from '~/constants/request'
import {
  GetResourcesParams,
  GetResourcesCategoriesParams,
  ItemsWithCount,
  Question,
  Categories,
  Attachment,
  CreateQuestionData,
  CategoryNameInterface,
  CreateCategoriesParams,
  UpdateQuestionParams,
  GetQuestion,
  UpdateResourceCategory,
  ApiMethodEnum,
  LessonData,
  Lesson,
  CreateQuizParams,
  UpdateQuizParams,
  Quiz
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getQuestions: (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Question>>> =>
    axiosClient.get(URLs.resources.questions.get, { params }),
  getQuestion: async (id?: string): Promise<AxiosResponse<GetQuestion>> =>
    await axiosClient.get(createUrlPath(URLs.resources.questions.get, id)),
  createQuestion: async (data?: CreateQuestionData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.resources.questions.post, data),
  updateQuestion: async (params?: UpdateQuestionParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.questions.patch, params?.id),
      params
    ),
  deleteQuestion: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.questions.delete, id)
    ),

  getResourcesCategories: (
    params?: GetResourcesCategoriesParams
  ): Promise<AxiosResponse<ItemsWithCount<Categories>>> =>
    axiosClient.get(URLs.resources.resourcesCategories.get, { params }),
  getResourcesCategoriesNames: (): Promise<
    AxiosResponse<CategoryNameInterface[]>
  > => axiosClient.get(URLs.resources.resourcesCategories.getNames),
  createResourceCategory: async (
    params?: CreateCategoriesParams
  ): Promise<AxiosResponse<Categories>> =>
    await axiosClient.post(URLs.resources.resourcesCategories.post, params),
  deleteResourceCategory: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.resourcesCategories.delete, id)
    ),

  getAttachments: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Attachment>>> =>
    await axiosClient.get(URLs.resources.attachments.get, { params }),

  getLessons: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    axiosClient.get(URLs.resources.lessons.get, { params }),
  getLesson: async (id?: string): Promise<AxiosResponse<Lesson>> =>
    await axiosClient.get(createUrlPath(URLs.resources.lessons.get, id)),
  addLesson: async (data: LessonData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.resources.lessons.post, data),
  editLesson: async (data: LessonData, id?: string): Promise<AxiosResponse> =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.lessons.patch, id),
      data
    ),
  deleteLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),

  getQuiz: async (id?: string): Promise<AxiosResponse<Quiz>> =>
    await axiosClient.get(createUrlPath(URLs.resources.quizzes.get, id)),
  addQuiz: async (params?: CreateQuizParams): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.resources.quizzes.post, params),
  editQuiz: async (params?: UpdateQuizParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.quizzes.patch, params?._id),
      params
    )
}

export const resourceService = appApi.injectEndpoints({
  endpoints: (build) => ({
    updateResourceCategory: build.mutation<void, UpdateResourceCategory>({
      query: (params) => ({
        url: createUrlPath(URLs.resources.resourcesCategories.patch, params.id),
        method: ApiMethodEnum.PATCH,
        body: { ...params }
      })
    })
  })
})

export const { useUpdateResourceCategoryMutation } = resourceService
