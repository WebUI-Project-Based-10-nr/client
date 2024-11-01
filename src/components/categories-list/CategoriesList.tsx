import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import CardsList from '../cards-list/CardsList'
import CardWithLink from '../card-with-link/CardWithLink'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { CategoryInterface } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import useLoadMore from '~/hooks/use-load-more'
import useBreakpoints from '~/hooks/use-breakpoints'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { itemsLoadLimit } from '~/constants'

const CategoriesList = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
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
        return (
          <CardWithLink
            description={`16 ${t('categoriesPage.offers')}`}
            img={serviceIcon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [categories, t]
  )

  return (
    <CardsList
      btnText={t('categoriesPage.viewMore')}
      cards={cards}
      isExpandable={isExpandable}
      loading={categoriesLoading}
      onClick={loadMore}
    />
  )
}

export default CategoriesList
