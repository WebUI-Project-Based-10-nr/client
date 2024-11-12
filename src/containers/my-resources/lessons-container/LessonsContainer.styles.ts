import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  lessonTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  lessonIcon: {
    mr: '15px'
  },
  lessonTitle: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.900'
  },
  attachmentsTitle: {
    color: 'primary.400',
    typography: TypographyVariantEnum.Caption
  },
  categoryChipLabel: {
    typography: TypographyVariantEnum.Caption,
    fontWeight: 500,
    color: 'basic.turquoiseDark'
  },
  categoryChip: {
    backgroundColor: 'inherit',
    border: `2px solid ${palette.basic.turquoiseDark}`,
    borderRadius: '50px',
    '& .MuiChip-label': { p: '0px 8px' }
  },
  date: {
    color: 'primary.400',
    typography: TypographyVariantEnum.Caption
  }
}
