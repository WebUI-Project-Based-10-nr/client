import { Box, Typography } from '@mui/material'
import { LanguagesEnum, ProficiencyLevelEnum } from '~/types'
import { styles } from '~/components/offer-card/offer-card-wide/offer-details/OfferDetails.styles'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'

interface OfferDetailsProps {
  chipsColor: string
  description: string
  languages: LanguagesEnum | LanguagesEnum[]
  level: ProficiencyLevelEnum | ProficiencyLevelEnum[]
  subject: string
  title: string
}

const OfferDetails: React.FC<OfferDetailsProps> = ({
  chipsColor,
  description,
  languages,
  level,
  subject,
  title
}) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={styles.title} variant='h6'>
        {title}
      </Typography>

      <SubjectLevelChips
        color={chipsColor}
        proficiencyLevel={level}
        subject={subject}
        sx={styles.chipContainer}
      />

      <Typography sx={styles.description} variant='body2'>
        {description}
      </Typography>

      <LanguagesListWithIcon languages={languages} />
    </Box>
  )
}

export default OfferDetails
