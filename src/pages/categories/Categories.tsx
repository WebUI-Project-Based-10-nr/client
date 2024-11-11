import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import useCategoriesNames from '~/hooks/use-categories-names'
import useLoadMore from '~/hooks/use-load-more'

import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { CategoryInterface } from '~/types'
import { categoryService } from '~/services/category-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import DirectionLink from '~/components/direction-link/DirectionLink'

import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import { categoryIcons } from '~/constants/icon-map'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

import palette from '~/styles/app-theme/app.pallete'
import { styles } from '~/pages/categories/Categories.styles'

type CategoryIconKey = keyof typeof categoryIcons

const arrow = <ArrowForwardIcon fontSize='small' />

const Categories = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const [searchQuery, setSearchQuery] = useState('')
  const params = useMemo(() => ({ name: searchQuery }), [searchQuery]) // for useLoadMore hook, maybe change ???

  const breakpoints = useBreakpoints()
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategoryNames = () => {
    if (!categoriesNames.length) void fetchData()
    return categoriesNames
  }

  const {
    loading: categoriesNamesLoading,
    response: categoriesNames,
    fetchData
  } = useCategoriesNames({ fetchOnMount: false })

  const {
    data: categories,
    loading: categoriesLoading, // for CardsList and for check
    // resetData,
    loadMore, // for CardsList
    isExpandable // for CardsList
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: categoryService.getCategories,
    limit: cardsLimit,
    params
  })

  const options = categoriesNames.map((category) => category.name)

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        const iconDb = item.appearance.icon
        const iconDbUrl = iconDb && iconDb.includes('http')
        const IconComponent =
          categoryIcons[item.name as CategoryIconKey] || categoryIcons.Language

        const renderedIcon = iconDbUrl ? (
          iconDb
        ) : (
          <IconComponent
            fontSize='large'
            sx={{
              color: item.appearance.color || palette.basic.blueGray,
              paddingRight: '12px'
            }}
          />
        )

        return (
          <CardWithLink
            description={`16 ${t('categoriesPage.offers')}`}
            img={renderedIcon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [categories, t]
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />
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

      {(!categories.length && !categoriesLoading) || categories.length === 0 ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', {
            name: 'category'
          })}
          description={t('errorMessages.tryAgainText', {
            name: 'category'
          })}
          onClick={() => openModal({ component: <CreateSubjectModal /> })}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
