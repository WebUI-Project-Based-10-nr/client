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
    color: '#566970'
  },
  dialogDescription: {
    marginTop: '15px',
    marginBottom: '20px',
    color: '#566970'
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
      backgroundColor: '#ff1a1a',
      color: 'black',
      borderStyle: 'none'
    }
  },
  noButton: {
    textTransform: 'none',
    fontWeight: 'bold',
    borderStyle: 'none',
    backgroundColor: '#ebeef0',
    '&:hover': {
      backgroundColor: '#737373',
      color: 'white',
      borderStyle: 'none'
    }
  }
}
