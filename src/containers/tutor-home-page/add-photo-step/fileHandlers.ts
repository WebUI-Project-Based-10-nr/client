import { validateFile, processFile, ValidationData } from './utils'

export const handleFileSelection = (
  file: File | null,
  setSelectedPhoto: (photo: string | null) => void,
  setUploaded: (uploaded: boolean) => void,
  onPhotoUpload: (photo: File) => void,
  validationData: ValidationData,
  t: (key: string) => string
) => {
  if (file && validateFile(file, validationData, t)) {
    processFile(
      file,
      setSelectedPhoto,
      setUploaded,
      onPhotoUpload,
      validationData,
      t
    )
  } else {
    console.error('Invalid file or validation failed.')
  }
}
