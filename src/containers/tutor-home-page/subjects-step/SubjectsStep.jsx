import { useState } from 'react'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import useBreakpoints from '~/hooks/use-breakpoints'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const imageBlock = (
  <Box sx={styles.imgContainer}>
    <Box component='img' src={img} sx={styles.img} />
  </Box>
)

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()

  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const [subjectsIsFetched, setSubjectsIsFetched] = useState(false)

  const onChangeCategory = (_, selectedCategory) => {
    if (category?._id === selectedCategory?._id) return

    setCategory(selectedCategory)
    setSubject(null)
    setSubjectsIsFetched(false)
  }

  const onChangeSubject = (_, selectedSubject) => {
    setSubject(selectedSubject)
  }

  const getSubjectsNames = () => {
    if (!category?._id) return
    return subjectService.getSubjectsNames(category._id)
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
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={category?._id ?? null}
            valueField='_id'
          />

          <AsyncAutocomplete
            axiosProps={{ onResponse: () => setSubjectsIsFetched(true) }}
            disabled={!category}
            fetchCondition={!subjectsIsFetched}
            fetchOnFocus
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
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
