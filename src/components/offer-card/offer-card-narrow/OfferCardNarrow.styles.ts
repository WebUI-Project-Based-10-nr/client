export const styles = {
  appCard: {
    minHeight: '460px',
    padding: '24px 20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  userInfo: {
    root: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: '20px'
    },
    avatar: {
      height: '100px',
      width: '100px'
    },
    info: {
      gap: '10px'
    }
  },

  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    lineClamp: 2,
    WebkitBoxOrient: 'vertical',
    boxOrient: 'vertical',
    overflow: 'hidden',
    typography: 'midTitle',
    fontWeight: 600,
    color: 'primary.700',
    wordBreak: 'break-word'
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: 'auto'
  },

  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  bookmarkButton: {
    top: '12px'
  }
}
