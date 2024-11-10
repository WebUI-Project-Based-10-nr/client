import {
  CommonEntityFields,
  RequestParams,
  Category,
  Attachment
} from '~/types'

export interface Categories extends CommonEntityFields {
  name: string
  author: string
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface UpdateResourceCategory {
  name: Categories['name']
  id: Categories['_id']
}

export interface GetResourcesCategoriesParams extends Partial<RequestParams> {
  name?: string
}

export interface Lesson extends CommonEntityFields {
  text: string
  title: string
  description: string
  author: string
  category: Category | null
  attachments: Attachment[]
}
