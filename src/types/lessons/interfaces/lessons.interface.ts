import { Attachment } from '~/types'

export interface LessonData {
  attachments: Attachment[]
  content: string
  category: string | null
  title: string
  description: string
}
