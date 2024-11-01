import { fadeAnimation } from '~/styles/app-theme/custom-animations'
import palette from '~/styles/app-theme/app.pallete'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { sm: '210px', md: '0px' },
    ...fadeAnimation
  },
  img: {
    width: '100%',
    maxHeight: '500px',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' }
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '440px',
    width: '100%',
    flex: 1,
    pb: { xs: '16px', sm: '26px', md: '52px' }
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'start',
    maxWidth: '440px',
    width: '100%',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mt: { xs: '20px', md: '0px' }
  },
  activeDrag: {
    border: '2px primary',
    borderColor: 'primary.900'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '432px',
    m: { md: 0, xs: '0 auto' },
    pt: 0,
    pb: { xs: '30px', sm: '0' }
  },
  description: {
    mb: '20px'
  },
  fileUploader: {
    button: {
      whiteSpace: 'nowrap',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      backgroundColor: palette.basic.grey,
      border: `1px solid ${palette.basic.gray}`,
      color: palette.basic.bismark,
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      width: '100%',
      maxWidth: '300px'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      maxWidth: '270px',
      overflow: 'auto'
    }
  }
}
