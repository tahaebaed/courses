import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import StepLabel from '@mui/material/StepLabel'
import CourseInfoForm from './CourseInfoForm'
import * as Yup from 'yup'

import { db } from '../firebase'

const steps = [
  'course landing page details',
  'course pricing details',
  'course lessons',
]

export default function CourseSteps({ closeModal }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    activeStep < steps.length - 1 &&
      setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStep = step => () => {
    setActiveStep(step)
  }
  const initialValues = {
    name: '',
    duration: 0,
    price: 0,
    instructor: '',
    instructorImg: '',
    lessons: [{ name: '', difficulty: 'beginner' }],
  }
  const handleComplete = async values => {
    await db
      .collection('courses')
      .doc()
      .set(values)
      .then(res => {
        alert('your course has been added')

        closeModal()
      })
      .catch(err => alert(err))
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ]
  const validationSchema = Yup.object({
    name: Yup.string().required('course name is required'),
    duration: Yup.number()
      .min(1, 'your course need to have a duration time')
      .required('duration is required'),
    price: Yup.number()
      .min(1, 'your price should be at least 1$')
      .required('price is required'),
    instructor: Yup.string.apply().required("instructor's name is required"),
    instructorImg: Yup.mixed().test(
      'fileFormat',
      'Unsupported Format',
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
    lessons: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('lesson name is required'),
        difficulty: Yup.string().required('lesson difficulty is required'),
      })
    ),
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel color='inherit' onClick={handleStep(index)}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CourseInfoForm
              step={activeStep}
              validationSchema={validationSchema}
              initialValues={initialValues}
              activeStep={activeStep}
              completed={completed}
              handleBack={handleBack}
              handleComplete={handleComplete}
              handleNext={handleNext}
              steps={steps}
            />
          </React.Fragment>
        )}
      </div>
    </Box>
  )
}
