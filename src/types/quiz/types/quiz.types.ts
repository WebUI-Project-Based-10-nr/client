import { Question } from '~/types'

export type Quiz = {
  _id?: string | undefined
  title: string
  description: string
  items: Question[]
  category: string | null
}

export type CreateQuizParams = Omit<Quiz, 'category'> & {
  category?: string | null
}

export type UpdateQuizParams = Quiz & {
  id?: string | undefined
}
