import { PhotoCamera } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { Field } from 'formik'
import React, { useEffect, useState } from 'react'

import TheFieldText from './TheFieldText'

const CourseDetailForm = ({
  values,
  handleBack,
  handleNext,
  errors,
  touched,
  setFieldValue,
  ...rest
}) => {
  const [fileImg, setFileImg] = useState(null)

  useEffect(() => {
    if (fileImg) {
      const reader = new FileReader()
      reader.onload = () => {
        fileImg.size > 1000000
          ? alert('img must be less than 1mb')
          : setFieldValue('instructorImg', reader.result)
      }
      reader.readAsDataURL(fileImg)
    }
  }, [fileImg, setFieldValue])
  return (
    <>
      <div className='course-details-instructor'>
        <TheFieldText fieldName='instructor' label='instructor name' />
        <Field as='file' name='instructorImg'>
          {({ form, field }) => {
            return (
              <label
                className='course-details-instructor_img-label'
                htmlFor='icon-button-file'
              >
                <img
                  className='course-info_img'
                  src={
                    values.instructorImg ||
                    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'
                  }
                  alt='instructor avatar'
                />
                <input
                  accept='image/*'
                  id='icon-button-file'
                  type='file'
                  error={
                    form.errors.instructorImg && form.touched.instructorImg
                  }
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file && file.type.substring(0, 5) === 'image') {
                      setFileImg(file)
                    } else {
                      setFileImg(null)
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <div className='course-details-instructor_img-icon'>
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                  >
                    <PhotoCamera />
                  </IconButton>
                </div>
              </label>
            )
          }}
        </Field>
      </div>
      <div className='course-details-info'>
        <TheFieldText fieldName='name' label='course name' sx={{ mr: 2 }} />
        <TheFieldText
          fieldName='duration'
          label='course duration'
          sx={{ mr: 2 }}
        />
        <TheFieldText fieldName='price' label='course price' sx={{ mr: 2 }} />
      </div>
      <div className='course-details-button'>
        <Button variant='text' color='primary' onClick={handleBack}>
          Back
        </Button>
        <Button
          variant='text'
          color='primary'
          onClick={handleNext}
          disabled={
            !!errors.name ||
            !!errors.instructor ||
            !!errors.duration ||
            !!errors.price
          }
        >
          next
        </Button>
      </div>
    </>
  )
}

export default CourseDetailForm
