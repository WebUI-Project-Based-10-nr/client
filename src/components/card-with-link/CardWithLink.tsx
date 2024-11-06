import { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/card-with-link/CardWithLink.styles'

interface CardWithLinkProps {
  img: string | ReactNode
  title: string
  description: string
  link: string
}

const CardWithLink: FC<CardWithLinkProps> = ({
  img,
  title,
  description,
  link
}) => {
  return (
    <AppCard link={link}>
      {typeof img === 'string' ? (
        <Box alt='item image' component='img' src={img} sx={styles.img} />
      ) : (
        img
      )}

      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CardWithLink
