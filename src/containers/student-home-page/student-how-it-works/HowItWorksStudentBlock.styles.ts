export const styles = {
  container: {
    flexDirection: 'column',
    p: 4
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    mb: 15
  },
  card: {
    maxWidth: '229px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mb: '48px'
    },
    title: {
      typography: 'h4'
    },
    description: {
      typography: 'subtitle1'
    }
  },
  cardTitleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mt: 3
    },
    title: {
      typography: 'h6',
      mb: 2
    },
    description: {
      typography: 'body2'
    }
  }
}
