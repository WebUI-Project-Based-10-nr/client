import { Typography } from '@mui/material'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import Box from '@mui/material/Box'
import StepImage from '~/components/step-image/StepImage'

import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'

import { languages } from '~/containers/tutor-home-page/language-step/constants'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const image = <StepImage img={img} />

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const languageData = stepData.language

  const onChangeLanguage = (_, selectedLanguage) => {
    handleStepData('language', selectedLanguage)
  }

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && image}
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography mb='20px'>{t('becomeTutor.languages.title')}</Typography>
          {isMobile && image}

          <AppAutoComplete
            data-testid='language'
            onChange={onChangeLanguage}
            options={languages}
            sx={{ mb: '20px' }}
            textFieldProps={{
              label: t('becomeTutor.languages.autocompleteLabel')
            }}
            value={languageData}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
