import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  box: {
    margin: { xs: '0 auto', sm: 0 },
    display: { xl: 'flex' },
    flexDirection: 'column',
    justifyContent: 'center',
    height: { xl: '100%' }
  },
  contentWraper: { overflowY: { lg: 'auto' } },
  icon: {
    color: 'primary.900',
    position: 'absolute',
    right: { xs: '8px', sm: '20px' },
    top: { xs: '8px', sm: '20px' }
  },
  dialogPaper: {
    padding: '20px',
    borderRadius: '8px'
  },
  dialogTitle: {
    fontWeight: 'bold',
    color: palette.basic.bismark
  },
  dialogDescription: {
    marginTop: '15px',
    marginBottom: '20px',
    color: palette.basic.bismark
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  yesButton: {
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: palette.error[500],
      color: palette.basic.black,
      borderStyle: 'none'
    }
  },
  noButton: {
    textTransform: 'none',
    fontWeight: 'bold',
    borderStyle: 'none',
    backgroundColor: palette.basic.grey,
    '&:hover': {
      backgroundColor: palette.basic.burntOrange,
      color: palette.basic.white,
      borderStyle: 'none'
    }
  }
}
