import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '60px', md: '40px' }
  },
  imgContainer: {
    maxWidth: { lg: '472px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' },
    pl: { lg: '96px', md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: { xs: '24px', sm: '56px' },
    pl: { xs: '8px', sm: '104px', md: '16px' }
  },
  title: {
    mb: '16px',
    lineHeight: '42px',
    fontSize: { xs: '32px', md: '35px' }
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '315px', md: '340px', lg: '400px' },
    pt: '16px',
    pr: { xs: '8px', sm: '104px', md: '60px', lg: '96px' },
    pb: { xs: '24px', sm: '56px' },
    ...scrollbar
  }
}

export default style
