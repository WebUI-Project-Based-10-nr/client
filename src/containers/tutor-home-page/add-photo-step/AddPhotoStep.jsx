import { useState, useRef, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { useTranslation } from 'react-i18next'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckIcon from '@mui/icons-material/Check'
import { validationData } from './constants'
import { handleFileSelection } from './fileHandlers'
import palette from '~/styles/app-theme/app.pallete'

const AddPhotoStep = ({ btnsBox, onPhotoUpload, uploadedPhoto }) => {
  const { t } = useTranslation()
  const [uploaded, setUploaded] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(uploadedPhoto)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (uploadedPhoto) {
      setSelectedPhoto(uploadedPhoto)
      setUploaded(true)
    } else {
      setUploaded(false)
    }
  }, [uploadedPhoto])

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    handleFileSelection(
      file,
      setSelectedPhoto,
      setUploaded,
      onPhotoUpload,
      validationData,
      t
    )
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    const files = event.dataTransfer.files
    if (files.length > 0) {
      handleFileSelection(
        files[0],
        setSelectedPhoto,
        setUploaded,
        onPhotoUpload,
        validationData,
        t
      )
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  return (
    <Box
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={style.root}
    >
      <Box sx={style.uploadBox}>
        {selectedPhoto ? (
          <img
            alt='becomeTutor.photo.imageAlt'
            src={selectedPhoto}
            style={style.img}
          />
        ) : (
          <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
        )}
      </Box>
      <Box sx={style.rigthBox}>
        <Typography sx={style.description}>
          {t('becomeTutor.photo.description')}
        </Typography>
        <Button
          onClick={handleUpload}
          sx={{
            ...style.fileUploader.button,
            backgroundColor: isDragOver ? palette.basic.lime : 'transparent'
          }}
        >
          <CloudUploadIcon style={{ marginRight: '10px' }} />
          {uploaded
            ? t('becomeTutor.photo.successButton')
            : isDragOver
              ? t('becomeTutor.photo.dragButton')
              : t('becomeTutor.photo.button')}
          {uploaded && (
            <CheckIcon
              style={{
                color: palette.basic.fruitSalad,
                marginLeft: '111px',
                pointerEvents: 'none'
              }}
            />
          )}
        </Button>
        <input
          accept='image/*'
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type='file'
        />
        <Typography
          sx={{
            color: palette.basic.gray,
            fontSize: '12px',
            marginTop: '8px',
            marginBottom: '287px'
          }}
        >
          {t('becomeTutor.photo.fileSizeError')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
