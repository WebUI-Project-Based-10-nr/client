import { useEffect, useState } from 'react'
import { Typography, Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import illustration from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { createFilterOptions } from '@mui/material'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import axios from 'axios'
import { useStepContext } from '~/context/step-context'
import StepImage from '~/components/step-image/StepImage'

const COUNTRIES_API_URL = import.meta.env.VITE_COUNTRIES_API_URL
const CITIES_API_URL = import.meta.env.VITE_CITIES_API_URL

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleGeneralInfo } = useStepContext()
  const generalInfo = stepData.generalInfo

  const [countries, setCountries] = useState([])
  const [countryCodes, setCountryCodes] = useState({})
  const [cities, setCities] = useState([])
  const [data, setData] = useState({
    firstName: generalInfo.data.firstName || '',
    lastName: generalInfo.data.lastName || '',
    country: generalInfo.data.country || '',
    city: generalInfo.data.city || '',
    professionalSummary: generalInfo.data.professionalSummary || ''
  })

  useEffect(() => {
    axios
      .get(COUNTRIES_API_URL)
      .then((response) => {
        const countryNames = response.data
          .map((country) => {
            setCountryCodes((prevCodes) => ({
              ...prevCodes,
              [country.name.common]: country.cca2
            }))
            return country.name.common
          })
          .sort((a, b) => a.localeCompare(b))
        setCountries(countryNames)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    const fetchCities = (country) => {
      const countryCode = countryCodes[country]

      if (countryCode) {
        axios
          .get(
            `${CITIES_API_URL}?formatted=true&country=${countryCode}&maxRows=10&username=geer_sann`
          )
          .then((response) => {
            const cityNames = response.data.geonames.map((city) => city.name)
            setCities(cityNames)
          })
          .catch((error) => {
            console.error('Error fetching cities:', error)
          })
      } else {
        setCities([])
      }
    }

    if (data.country) {
      fetchCities(data.country)
    } else {
      setCities([])
    }
  }, [data.country, countryCodes])

  useEffect(() => {
    handleGeneralInfo({ data })
  }, [data, handleGeneralInfo])

  const handleInputChange = (field) => (event) => {
    setData({ ...data, [field]: event.target.value })
  }

  const filterOptions = (options, state) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 300)
  }

  return (
    <Box sx={styles.container}>
      <Grid alignItems='center' container justifyContent='center' spacing={4}>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }} xs={12}>
          <Box
            sx={{
              ...styles.imgContainer,
              maxWidth: '100%',
              height: 'auto'
            }}
          >
            <StepImage img={illustration} />
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
              onBlur={() => {}}
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
              onBlur={() => {}}
              onChange={handleInputChange('lastName')}
              placeholder={t('common.labels.lastName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.lastName}
            />
            <AppAutoComplete
              isOptionEqualToValue={(option, value) =>
                option === value || value === ''
              }
              onChange={(event, newValue) => {
                setData((prevData) => ({
                  ...prevData,
                  country: newValue,
                  city: ''
                }))
              }}
              options={countries}
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.country')
              }}
              value={data.country}
            />
            <AppAutoComplete
              disabled={!data.country}
              filterOptions={filterOptions}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ''
              }
              onChange={(event, newValue) => {
                setData((prevData) => ({
                  ...prevData,
                  city: newValue
                }))
              }}
              options={cities}
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
