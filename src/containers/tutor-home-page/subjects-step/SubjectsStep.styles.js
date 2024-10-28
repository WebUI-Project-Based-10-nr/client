import palette from '~/styles/app-theme/app.pallete'
import appTypography from '~/styles/app-theme/app.typography'
import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  contentBox: { mb: { xs: '30px', sm: '0' } },
  button: {
    padding: '14px 24px',
    width: '100%',
    borderRadius: '4px',
    backgroundColor: palette.basic.grey,
    color: palette.basic.gunmetal,
    fontFamily: appTypography.fontFamily,
    ...appTypography.button
  },
  chipsWrapper: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px 4px',
    mt: '20px'
  },
  chip: {
    padding: '8px 4px',
    borderRadius: '10px',
    backgroundColor: palette.basic.grey,
    color: palette.basic.steelGrey,
    fontFamily: appTypography.fontFamily,
    ...appTypography.body2
  },
  chipDeleteIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    marginBottom: 'auto',
    pb: '2px'
  }
}
