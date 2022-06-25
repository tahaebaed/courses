import { Button, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Field, FieldArray } from 'formik'
import React from 'react'
import { pink } from '@mui/material/colors'

import Select from './Select'

const LessonsForm = ({ values, handleNext, touched, errors, ...rest }) => (
  <FieldArray name='lessons'>
    {arrayHelper => {
      return (
        <>
          {values.lessons.map((lesson, index) => (
            <div className='lesson-form-control' key={index}>
              <Field name={`lessons[${index}].name`}>
                {({ field, form }) => {
                  const lessonError =
                    typeof form.errors.lessons === 'object' &&
                    form.errors.lessons.length > 0 &&
                    form?.errors?.lessons[index]?.name

                  const lessonTouched =
                    typeof form.touched.lessons === 'object' &&
                    form.touched.lessons.length > 0 &&
                    form?.touched?.lessons[index]?.name
                  return (
                    <TextField
                      type='text'
                      id={`lessons[${index}].name`}
                      variant='filled'
                      error={lessonError && lessonTouched}
                      helperText={lessonError && lessonTouched && lessonError}
                      label='lesson name'
                      {...field}
                    />
                  )
                }}
              </Field>
              <Select name={`lessons[${index}].difficulty`} {...rest} />
              <IconButton
                aria-label='delete'
                variant='contained'
                sx={{ color: pink[500], mt: 1 }}
                onClick={() => arrayHelper.remove(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <div className='lesson-form-add-btn'>
            <IconButton
              aria-label='add'
              variant='contained'
              color='success'
              onClick={() =>
                arrayHelper.push({ name: '', difficulty: 'beginner' })
              }
            >
              <AddIcon />
            </IconButton>
          </div>
          <div className='lesson-next-button'>
            <Button variant='text' color='primary' onClick={handleNext}>
              next
            </Button>
          </div>
        </>
      )
    }}
  </FieldArray>
)

export default LessonsForm
