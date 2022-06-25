import { Button } from '@mui/material'
import { Formik, Form } from 'formik'
import React from 'react'

import FormControl from '../components/FormControl'

const CourseInfoForm = ({
  step,
  validationSchema,
  initialValues,
  activeStep,
  handleBack,
  handleNext,
  steps,
  completed,
  handleComplete,
}) => (
  <Formik initialValues={initialValues} validationSchema={validationSchema}>
    {formik => (
      <Form>
        <FormControl
          step={step}
          activeStep={activeStep}
          completed={completed}
          handleBack={handleBack}
          handleComplete={handleComplete}
          handleNext={handleNext}
          steps={steps}
          {...formik}
        />
        {step === 2 && (
          <div className='course-details-button'>
            <Button variant='text' color='primary' onClick={handleBack}>
              Back
            </Button>
            <Button
              variant='text'
              color='primary'
              type='submit'
              onClick={() => handleComplete(formik.values)}
            >
              confirm
            </Button>
          </div>
        )}
      </Form>
    )}
  </Formik>
)

export default CourseInfoForm
