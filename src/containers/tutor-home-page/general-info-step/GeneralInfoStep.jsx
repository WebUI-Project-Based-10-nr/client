import { useEffect } from 'react'
import { Typography, Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import illustration from '~/assets/img/student-home/general-tab-img.svg'
import { createFilterOptions } from '@mui/material'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useForm from '~/hooks/use-form'

import { useStepContext } from '~/context/step-context'
import { validations } from '~/components/user-steps-wrapper/constants'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleGeneralInfo } = useStepContext()
  const generalInfo = stepData.generalInfo

  const { handleInputChange, handleBlur, data, errors } = useForm({
    initialValues: generalInfo.data,
    initialErrors: {
      city: generalInfo.errors['city'] || '',
      country: generalInfo.errors['country'] || '',
      firstName: generalInfo.errors['firstName'] || '',
      lastName: generalInfo.errors['lastName'] || '',
      professionalSummary: generalInfo.errors['professionalSummary'] || ''
    },
    ...validations
  })

  useEffect(() => {
    handleGeneralInfo({ data, errors })
  }, [data, errors, handleGeneralInfo])

  const filterOptions = (options, state) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 300)
  }

  return (
    <Box sx={styles.container}>
      <Grid alignItems='center' container justifyContent='center' spacing={4}>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }} xs={12}>
          <Box sx={styles.imgContainer}>
            <Box
              alt='Illustration'
              component='img'
              src={illustration}
              sx={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
        <Box component='form' sx={styles.form}>
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
          <Box sx={styles.formFieldsContainer}>
            <AppTextField
              fullWidth
              label={t('common.labels.firstName')}
              onBlur={handleBlur('firstName')}
              onChange={handleInputChange('firstName')}
              placeholder={t('common.labels.firstName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.firstName}
            />
            <AppTextField
              fullWidth
              label={t('common.labels.lastName')}
              onBlur={handleBlur('lastName')}
              onChange={handleInputChange('lastName')}
              placeholder={t('common.labels.lastName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.lastName}
            />
            <AppAutoComplete
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.country')
              }}
              value={data.country}
            />
            <AppAutoComplete
              disabled={!data.country}
              filterOptions={filterOptions}
              options={[]}
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.city')
              }}
              value={data.city}
            />
          </Box>
          <AppTextArea
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={70}
            onChange={handleInputChange('professionalSummary')}
            type='text'
            value={data.professionalSummary}
          />
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.helperText')}
          </Typography>
          {btnsBox}
        </Box>
      </Grid>
    </Box>
  )
}

export default GeneralInfoStep
