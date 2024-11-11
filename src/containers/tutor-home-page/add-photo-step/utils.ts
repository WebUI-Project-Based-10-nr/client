export interface ValidationData {
  filesTypes: string[]
  maxFileSize: number
  typeError: string
  fileSizeError: string
}

export const validateFile = (
  file: File,
  validationData: ValidationData,
  t: (key: string) => string
): boolean => {
  if (!validationData.filesTypes.includes(file.type)) {
    alert(t(validationData.typeError))
    return false
  }
  if (file.size > validationData.maxFileSize) {
    alert(t(validationData.fileSizeError))
    return false
  }
  return true
}

export const processFile = (
  file: File,
  setSelectedPhoto: (photo: string) => void,
  setUploaded: (uploaded: boolean) => void,
  onPhotoUpload: (photo: File) => void,
  validationData: ValidationData,
  t: (key: string) => string
) => {
  if (file && validateFile(file, validationData, t)) {
    const imageUrl = URL.createObjectURL(file)
    setSelectedPhoto(imageUrl)
    setUploaded(true)
    onPhotoUpload(file)
    return imageUrl
  }
}
