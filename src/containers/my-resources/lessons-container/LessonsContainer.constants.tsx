import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import Box from '@mui/material/Box'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import Typography from '@mui/material/Typography'
import AppChip from '~/components/app-chip/AppChip'
import {
  AdditionalPropsInterface,
  Lesson,
  RemoveColumnRules,
  SortEnum,
  TableColumn
} from '~/types'

export const columns: TableColumn<Lesson>[] = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (
      item: Lesson,
      { navigate }: AdditionalPropsInterface
    ) => {
      const handleClick = () => {
        navigate(
          createUrlPath(authRoutes.myResources.editLesson.path, item._id)
        )
      }
      return (
        <Box onClick={handleClick} sx={styles.lessonTitleContainer}>
          <ArticleOutlinedIcon sx={styles.lessonIcon} />
          <Typography sx={styles.lessonTitle}>{item.title}</Typography>
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.lessons.attachments',
    field: 'attachments',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) => {
      const attachmentsQuantity = item.attachments.length
      const attachmentSuffix = attachmentsQuantity === 1 ? '' : 's'
      return (
        <Typography sx={styles.attachmentsTitle}>
          {attachmentsQuantity}{' '}
          {`${t(`myResourcesPage.lessons.attachment${attachmentSuffix}Quantity`)}`}
        </Typography>
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) =>
      item.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {item.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.updated',
    field: 'updatedAt',
    calculatedCellValue: (item: Lesson) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Lesson> = {
  tablet: [
    'myResourcesPage.lessons.updated',
    'myResourcesPage.lessons.attachments'
  ],
  mobile: [
    'myResourcesPage.lessons.updated',
    'myResourcesPage.lessons.attachments'
  ]
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}
