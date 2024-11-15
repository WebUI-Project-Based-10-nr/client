import { FC } from 'react'
import Box from '@mui/material/Box'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'
import IconButton from '~/components/view-switcher/icon-button/IconButton'
import { CardsViewMode } from '~/types'
import { styles } from '~/components/view-switcher/ViewSwitcher.styles'

interface ViewSwitcherProps {
  onChange: (viewMode: CardsViewMode) => void
  viewMode: CardsViewMode
}

const ViewSwitcher: FC<ViewSwitcherProps> = ({ onChange, viewMode }) => {
  const handleClick = (newViewMode: CardsViewMode) => {
    if (newViewMode === viewMode) return
    onChange(newViewMode)
  }

  return (
    <Box sx={styles.container}>
      <IconButton
        icon={<FormatListBulletedIcon sx={styles.icon} />}
        onClick={() => handleClick('list')}
        selected={viewMode === 'list'}
        value='list'
      />

      <IconButton
        icon={<GridViewIcon sx={styles.icon} />}
        onClick={() => handleClick('grid')}
        selected={viewMode === 'grid'}
        value='grid'
      />
    </Box>
  )
}

export default ViewSwitcher
