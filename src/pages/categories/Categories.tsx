import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import useLoadMore from '~/hooks/use-load-more'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'

import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { CategoryInterface, CategoriesParams } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from '~/pages/categories/Categories.styles'

const arrow = <ArrowForwardIcon fontSize='small' />
const limits = {
  default: 9,
  tablet: 8,
  mobile: 6
}

const Categories = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const [searchQuery, setSearchQuery] = useState('')
  const params = useMemo(() => ({ name: searchQuery }), [searchQuery]) // for useLoadMore hook, maybe change ???

  const breakpoints = useBreakpoints()
  const cardsLimit = getScreenBasedLimit(breakpoints, limits)

  const getCategoryNames = () => {
    if (!categoriesNames.length) void fetchData()
    return categoriesNames
  }
  const getCategories = (data?: Partial<CategoriesParams>) => {
    return categoryService.getCategories(data)
  }

  const {
    loading: categoriesNamesLoading,
    response: categoriesNames,
    fetchData
  } = useCategoriesNames({ fetchOnMount: false })

  const {
    data: categories,
    loading: categoriesLoading // for CardsList and for check
    // resetData,
    // loadMore, // for CardsList
    // isExpandable // for CardsList
  } = useLoadMore<CategoryInterface, Partial<CategoriesParams>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const options = categoriesNames.map((category) => category.name)

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
          loading={categoriesNamesLoading}
          onFocus={getCategoryNames}
          options={options}
          search={searchQuery}
          setSearch={setSearchQuery}
          textFieldProps={{ label: t('categoriesPage.searchLabel') }}
        />
      </AppToolbar>

      {!categories.length && !categoriesLoading && (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', {
            name: 'category'
          })}
          description={t('errorMessages.tryAgainText', {
            name: 'category'
          })}
          onClick={() => openModal({ component: <CreateSubjectModal /> })}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
