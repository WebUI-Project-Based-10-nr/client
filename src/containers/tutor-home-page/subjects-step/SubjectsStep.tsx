import { SyntheticEvent, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { Button, Chip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'
import { tutor } from '~/constants'

interface SubjectsStepProps {
  btnsBox: JSX.Element
  role: string
}

interface ChipProps {
  subject: SubjectNameInterface
  onDelete: (subject: SubjectNameInterface) => void
}

const imageBlock = (
  <Box sx={styles.imgContainer}>
    <Box component='img' src={img} sx={styles.img} />
  </Box>
)

const SubjectChip = ({ subject, onDelete }: ChipProps) => (
  <Chip
    deleteIcon={
      <Box sx={styles.chipDeleteIcon}>
        <span style={{ fontSize: '20px', color: '#455A64' }}>x</span>
      </Box>
    }
    key={subject._id}
    label={subject.name}
    onDelete={() => onDelete(subject)}
    sx={styles.chip}
  />
)

const SubjectsStep = ({ btnsBox, role }: SubjectsStepProps) => {
  const placeholder =
    role === tutor
      ? 'becomeTutor.categories.mainSubjectsLabelTutor'
      : 'becomeTutor.categories.mainInterestsLabelStudent'

  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()

  const [category, setCategory] = useState<CategoryNameInterface | null>(null)
  const [subject, setSubject] = useState<SubjectNameInterface | null>(null)
  const [subjectsAreFetched, setSubjectsAreFetched] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<
    SubjectNameInterface[]
  >([])

  useEffect(() => {
    setSubject(null)
    setSubjectsAreFetched(false)
  }, [category])

  const onChangeCategory = (
    _: SyntheticEvent,
    selectedCategory: CategoryNameInterface | null
  ) => {
    if (category?._id === selectedCategory?._id) return

    setCategory(selectedCategory)
  }

  const onChangeSubject = (
    _: SyntheticEvent,
    selectedSubject: SubjectNameInterface | null
  ) => {
    setSubject(selectedSubject)
  }

  const getSubjectsNames = async () => {
    return subjectService.getSubjectsNames(category?._id ?? null)
  }

  const handleAddSubject = () => {
    if (subject && !selectedSubjects.some((s) => s._id === subject._id)) {
      setSelectedSubjects((prev) => [...prev, subject])
      setSubject(null)
    }
  }

  const handleDeleteChip = (chipToDelete: SubjectNameInterface) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject._id !== chipToDelete._id)
    )
  }

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageBlock}
      <Box sx={styles.rigthBox}>
        <Box sx={styles.contentBox}>
          <Typography mb='20px'>{t('becomeTutor.categories.title')}</Typography>
          {isMobile && imageBlock}

          <AsyncAutocomplete
            fetchOnFocus
            labelField='name'
            onChange={onChangeCategory}
            service={categoryService.getCategoriesNames}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t(placeholder)
            }}
            value={category?._id ?? null}
            valueField='_id'
          />

          <AsyncAutocomplete
            axiosProps={{ onResponse: () => setSubjectsAreFetched(true) }}
            disabled={!category}
            fetchCondition={!subjectsAreFetched}
            fetchOnFocus
            key={category?._id ?? 'no-category'}
            labelField='name'
            onChange={onChangeSubject}
            service={getSubjectsNames}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subject?._id ?? null}
            valueField='_id'
          />
          <Button
            disabled={!subject}
            onClick={handleAddSubject}
            sx={styles.button}
          >
            Add one more subject
          </Button>

          <Box sx={styles.chipsWrapper}>
            {selectedSubjects.slice(0, 2).map((subject) => (
              <SubjectChip
                key={subject._id}
                onDelete={handleDeleteChip}
                subject={subject}
              />
            ))}
            {selectedSubjects.length > 2 && (
              <Chip
                label={`+${selectedSubjects.length - 2}`}
                sx={(styles.chip, { fontWeight: '500', borderRadius: '10px' })}
              />
            )}
          </Box>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
