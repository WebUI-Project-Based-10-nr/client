import Box from '@mui/system/Box'
import { useCallback, useRef, useState } from 'react'
import { ResourceService } from '~/services/resource-service'
import usePagination from '~/hooks/table/use-pagination'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'
import {
  columns,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import useBreakpoints from '~/hooks/use-breakpoints'
import useSort from '~/hooks/table/use-sort'
import { initialSort } from '~/containers/add-resources/AddResources.constants'
import useAxios from '~/hooks/use-axios'
import {
  ErrorResponse,
  GetResourcesParams,
  ItemsWithCount,
  Lesson,
  ResourcesTabsEnum
} from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import Loader from '~/components/loader/Loader'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { useSnackBarContext } from '~/context/snackbar-context'

const LessonsContainer = () => {
  const { setAlert } = useSnackBarContext()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const searchTitle = useRef<string>('')
  const navigate = useNavigate()
  const breakpoints = useBreakpoints()
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const sortOptions = useSort({ initialSort })
  const { sort } = sortOptions
  const { page, handleChangePage } = usePagination()
  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getLessons = useCallback(
    () =>
      ResourceService.getLessons({
        limit: itemsPerPage,
        title: searchTitle.current,
        skip: (page - 1) * itemsPerPage,
        sort,
        categories: selectedItems
      }),
    [itemsPerPage, page, sort, selectedItems]
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    GetResourcesParams
  >({
    service: getLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id ?? ''),
    []
  )

  const editLesson = useCallback((id?: string) => {
    navigate(createUrlPath(authRoutes.myResources.editLesson.path, id))
  }, [editLesson])

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: {
      deleteService: deleteLesson
    },
    itemsPerPage,
    actions: {
      onEdit: editLesson
    },
    resource: ResourcesTabsEnum.Lessons,
    sort: sortOptions,
    pagination: {
      page,
      onChange: handleChangePage
    }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.lessons.addBtn'}
        fetchData={fetchData}
        link={authRoutes.myResources.newLesson.path}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lesson> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
