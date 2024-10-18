import { Question, Categories } from '~/types'

export type Quiz = Categories & {
  _id?: string | undefined
  title: string
  description: string
  items: Question[]
  category: string | { name: string } | null
  updatedAt: Date
}

export type CreateQuizParams = Omit<Quiz, 'category'> & {
  category?: string | null
}

export type UpdateQuizParams = Quiz & {
  id?: string | undefined
}
