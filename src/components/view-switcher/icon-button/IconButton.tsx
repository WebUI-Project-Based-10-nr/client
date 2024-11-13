import { FC, ReactNode } from 'react'
import { ToggleButton } from '@mui/material'
import { CardsViewMode } from '~/types'
import { styles } from '~/components/view-switcher/icon-button/IconButton.styles'

type IconButtonProps = {
  selected: boolean
  onClick: () => void
  icon: ReactNode
  value: CardsViewMode
}

const IconButton: FC<IconButtonProps> = ({
  selected,
  onClick,
  icon,
  value
}) => (
  <ToggleButton
    aria-selected={selected}
    data-testid={`${value}-view`}
    onClick={onClick}
    selected={selected}
    sx={styles}
    value={value}
  >
    {icon}
  </ToggleButton>
)

export default IconButton
