import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'

import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

const categories = null

const Categories = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  return (
    <PageWrapper>
      {!categories && (
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
