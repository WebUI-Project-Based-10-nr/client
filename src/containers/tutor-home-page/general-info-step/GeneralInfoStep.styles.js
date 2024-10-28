import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  form: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  imgContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: { lg: '0 122px 52px 0', md: '0 60px 52px 0' }
  },
  formFieldsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      sm: 'repeat(auto-fit, minmax(180px, 1fr))'
    },
    columnGap: 2
  }
}
