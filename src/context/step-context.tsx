import React, { createContext, useCallback, useContext, useState } from 'react'
import { initialValues } from '~/components/user-steps-wrapper/constants'
import { SubjectNameInterface } from '~/types'

type InitialValuesType = typeof initialValues

interface GeneralData {
  data: InitialValuesType
  errors: Record<string, string | undefined>
}

interface StepData {
  generalData: GeneralData
  subjects: SubjectNameInterface[]
  language: string | null
  photo: File[]
}

interface StepContextType {
  stepData: StepData
  handleStepData: (
    stepLabel: keyof StepData,
    data: unknown,
    errors?: Record<string, string>
  ) => void
  handleGeneralInfo: (generalStep: GeneralData) => void
}

interface StepProviderProps {
  children: React.ReactElement
  initialValues: InitialValuesType
  stepLabels: string[]
}

const StepContext = createContext<StepContextType>({} as StepContextType)

const StepProvider = ({
  children,
  initialValues,
  stepLabels
}: StepProviderProps) => {
  const [generalData, setGeneralData] = useState<GeneralData>({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState<SubjectNameInterface[]>([])
  const [language, setLanguage] = useState<string | null>(null)
  const [photo, setPhoto] = useState<File[]>([])
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

  const stepData: StepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  } as {
    [K in keyof StepData]: StepData[K]
  }

  const handleStepData = useCallback(
    (stepLabel: string, data: unknown, errors: Record<string, string> = {}) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData({ data: data as InitialValuesType, errors })
          break
        case subjectLabel:
          setSubject(data as SubjectNameInterface[])
          break
        case languageLabel:
          setLanguage(data as string)
          break
        case photoLabel:
          setPhoto(data as File[])
          break
        default:
          return
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  const handleGeneralInfo = useCallback((generalInfo: GeneralData) => {
    setGeneralData(generalInfo)
  }, [])

  return (
    <StepContext.Provider
      value={{ stepData, handleStepData, handleGeneralInfo }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
