import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import useForm from '~/hooks/use-form'
import { signup } from '~/constants'
import student from '~/assets/img/signup-dialog/student.svg'
import tutor from '~/assets/img/signup-dialog/tutor.svg'
import {
  firstName,
  lastName,
  confirmPassword,
  email,
  password
} from '~/utils/validations/login'

import styles from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()

  const { handleInputChange, handleBlur, data, errors } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validations: { firstName, lastName, email, password, confirmPassword }
  })

  const signupImg = {
    student,
    tutor
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={signupImg[type]}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h4'>
          {t('signup.head', { returnObjects: true })[type]}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={() => {}}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            role={type}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
