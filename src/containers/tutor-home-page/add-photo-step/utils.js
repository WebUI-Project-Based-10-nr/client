export const validateFile = (file, validationData, t) => {
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
  file,
  setSelectedPhoto,
  setUploaded,
  onPhotoUpload,
  validationData,
  t
) => {
  if (file && validateFile(file, validationData, t)) {
    const imageUrl = URL.createObjectURL(file)
    setSelectedPhoto(imageUrl)
    setUploaded(true)
    onPhotoUpload(imageUrl)
  }
}
