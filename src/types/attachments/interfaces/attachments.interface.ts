import { Category, CommonEntityFields, UserResponse } from '~/types'

export interface Attachment extends CommonEntityFields {
  category: Category
  author: Pick<UserResponse, '_id'>
  fileName: string
  size: number
}
