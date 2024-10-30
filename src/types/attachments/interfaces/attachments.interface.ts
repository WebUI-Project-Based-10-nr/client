import {
  CategoryNameInterface,
  CommonEntityFields,
  UserResponse
} from '~/types'

export interface Attachment extends CommonEntityFields {
  category: CategoryNameInterface | null
  author: Pick<UserResponse, '_id'>
  fileName: string
  size: number
}
