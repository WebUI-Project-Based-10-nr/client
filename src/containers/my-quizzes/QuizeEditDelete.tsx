import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ResourceService } from '~/services/resource-service'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'

const DeleteAndEditQuize = () => {
  const navigate = useNavigate()

  const deleteQuize = useCallback(async (id?: string) => {
    try {
      await ResourceService.deleteQuiz(id ?? '')
    } catch (error) {
      console.error('Error deleting quiz:', error)
    }
  }, [])

  const editQuize = useCallback(
    (id?: string) => {
      navigate(createUrlPath(authRoutes.myResources.editQuize.path, id))
    },
    [navigate]
  )

  const props = {
    services: {
      deleteQuize: deleteQuize
    },
    actions: {
      onEdit: editQuize
    }
  }

  {
    /* Replace to right rout  to future Quize container*/
  }
  return <div {...props} />
}

export default DeleteAndEditQuize
