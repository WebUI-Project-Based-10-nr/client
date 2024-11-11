import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface PriceProps {
  price: number
}

const Price: React.FC<PriceProps> = ({ price }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant='h6'>
        {price} {t('common.uah')}
      </Typography>
      <Typography variant='body2'>/{t('common.hour')}</Typography>
    </Box>
  )
}

export default Price
