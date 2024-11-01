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
import { useStepContext } from '~/context/step-context'

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
  const {
    stepData: { subjects = [] },
    handleStepData
  } = useStepContext()

  const handleAddSubject = (
    _: SyntheticEvent,
    selectedSubject: SubjectNameInterface | null
  ) => {
    if (selectedSubject) {
      const isSubjectAlreadyAdded = subjects.some(
        (subject: SubjectNameInterface) => subject._id === selectedSubject._id
      )
      if (!isSubjectAlreadyAdded) {
        const updatedSubjects = [...subjects, selectedSubject]
        handleStepData('subjects', updatedSubjects)
      }
    }
  }

  const handleDeleteChip = (chipToDelete: SubjectNameInterface) => {
    const updatedSubjects = subjects.filter(
      (subject: SubjectNameInterface) => subject._id !== chipToDelete._id
    )
    handleStepData('subjects', updatedSubjects)
  }

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
            onClick={(event) => handleAddSubject(event, subject)}
            sx={styles.button}
          >
            {t('becomeTutor.categories.btnText')}
          </Button>

          <Box sx={styles.chipsWrapper}>
            {subjects.slice(0, 2).map((subject: CategoryNameInterface) => (
              <SubjectChip
                key={subject._id}
                onDelete={handleDeleteChip}
                subject={subject}
              />
            ))}
            {subjects.length > 2 && (
              <Chip
                label={`+${subjects.length - 2}`}
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
