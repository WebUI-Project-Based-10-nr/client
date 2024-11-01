import { SortEnum } from '~/types'

export type Address = {
  country: string
  city: string
}

export type Category = {
  _id: string
  name: string
}

export type CreatedAt = {
  from: string
  to: string
}

export type LastLogin = {
  from: string
  to: string
}

export type Sort = {
  order: SortEnum
  orderBy: string
}

export type File = {
  name: string
  size: number
  createdAt: string | Date
  url: string
}

export type Link = {
  name: string
  url: string
}

export type Media = {
  name: string
  path: string
}
