import { Lesson, TableColumn } from '~/types'
import { Categories } from '~/types'
import { Question } from '~/types'
import { RequestParams } from '~/types/services/types/services.types'
import { Attachment } from '~/types'

export interface CategoriesParams extends RequestParams {
  name: string
}

export interface CreateCategoriesParams {
  name: Categories['name']
}

export interface ScreenBasedLimits {
  desktop?: number
  laptopAndDesktop?: number
  laptop?: number
  tablet: number
  mobile: number
  default: number
}

export interface RemoveColumnRules<
  T extends Question | Categories | Attachment | Lesson
> {
  desktop?: TableColumn<T>['label'][]
  tablet?: TableColumn<T>['label'][]
  mobile?: TableColumn<T>['label'][]
}
