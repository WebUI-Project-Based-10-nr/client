export const styles = {
  appCard: {
    p: '30px 20px',
    my: '24px',
    display: 'flex',
    position: 'relative',
    gap: { sm: '24px', md: '40px' },
    flexWrap: 'wrap',
    borderRadius: '6px'
  },

  userInfo: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      maxWidth: '112px'
    },
    avatar: {
      width: '80px',
      height: '80px',
      alignSelf: 'center',
      mb: '12px'
    }
  },

  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    pt: '30px'
  },

  bookmarkButton: {
    top: '20px'
  }
}
