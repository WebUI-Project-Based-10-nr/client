import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import useLoadMore from '~/hooks/use-load-more'

import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { CategoryInterface } from '~/types'
import { categoryService } from '~/services/category-service'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import CardsList from '~/components/cards-list/CardsList'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import { categoryIcons } from '~/constants/icon-map'

type CategoryIconKey = keyof typeof categoryIcons

const Categories = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const getCategories = useCallback(
    (data?: Pick<CategoryInterface, 'name'>) =>
      categoryService.getCategories(data),
    []
  )

  const {
    data: categories,
    loading: categoriesLoading,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Pick<CategoryInterface, 'name'>>({
    service: getCategories,
    limit: cardsLimit
  })

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        const defaultIcon =
          'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
        const iconDb = item.appearance.icon
        const iconDbUrl = iconDb && iconDb.includes('http')
        const IconComponent = categoryIcons[item.name as CategoryIconKey]

        const renderedIcon = iconDbUrl ? (
          iconDb
        ) : IconComponent ? (
          <IconComponent
            fontSize='large'
            sx={{
              color: item.appearance.color || '#808080',
              paddingRight: '12px'
            }}
          />
        ) : (
          defaultIcon
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

      {!categories ? (
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
