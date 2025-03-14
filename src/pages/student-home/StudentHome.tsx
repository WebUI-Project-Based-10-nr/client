import { useEffect } from 'react'
import Container from '@mui/material/Container'

import { useAppSelector } from '~/hooks/use-redux'
import { useModalContext } from '~/context/modal-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import FindBlock from '~/components/find-block/FindBlock'
import Faq from '~/containers/student-home-page/faq/Faq'

import { translationKey } from '~/components/find-block/find-tutor-constants'
import HowItWorksStudentBlock from '~/containers/student-home-page/student-how-it-works/HowItWorksStudentBlock'

const StudentHome = () => {
  const { openModal } = useModalContext()
  const { isFirstLogin, userRole } = useAppSelector((state) => state.appMain)
  const { isLaptopAndAbove } = useBreakpoints()

  useEffect(() => {
    if (isFirstLogin) {
      openModal({
        component: <UserStepsWrapper userRole={userRole} />,
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    }
  }, [openModal, isFirstLogin, userRole])

  return (
    <Container data-testid='studentHome' sx={{ flex: 1 }}>
      <FindBlock translationKey={translationKey} />
      {isLaptopAndAbove && <HowItWorksStudentBlock />}
      <Faq />
    </Container>
  )
}

export default StudentHome
