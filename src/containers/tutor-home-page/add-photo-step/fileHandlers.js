import { validateFile, processFile } from './utils'

export const handleFileSelection = (
  file,
  setSelectedPhoto,
  setUploaded,
  onPhotoUpload,
  validationData,
  t
) => {
  if (validateFile(file, validationData, t)) {
    processFile(
      file,
      setSelectedPhoto,
      setUploaded,
      onPhotoUpload,
      validationData,
      t
    )
  }
}
