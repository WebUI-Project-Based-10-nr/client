import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCategoriesNames from '~/hooks/use-categories-names'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/categories/Categories.styles'

const arrow = <ArrowForwardIcon fontSize='small' />

const Categories = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const {
    loading,
    response: categoriesNames,
    fetchData
  } = useCategoriesNames({ fetchOnMount: false })

  const options = categoriesNames.map((category) => category.name)

  const getCategoryNames = () => {
    if (!categoriesNames.length) void fetchData()
    return categoriesNames
  }

  return (
    <PageWrapper>
      <DirectionLink
        after={arrow}
        linkTo={authRoutes.findOffers.path}
        title={t('categoriesPage.showAllOffers')}
      />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={loading}
          onFocus={getCategoryNames}
          options={options}
          search={searchQuery}
          setSearch={setSearchQuery}
          textFieldProps={{ label: t('categoriesPage.searchLabel') }}
        />
      </AppToolbar>
    </PageWrapper>
  )
}

export default Categories
