import { Button, IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Field, FieldArray, getIn } from 'formik'
import React from 'react'
import { pink } from '@mui/material/colors'

import Select from './Select'

const LessonsForm = ({ values, handleNext, touched, errors, ...rest }) => {
  return (
    <FieldArray name='lessons'>
      {arrayHelper => {
        const disabledHandler =
          !!getIn(errors.lessons) || !getIn(touched.lessons)

        return (
          <>
            {values.lessons.map((_, index) => {
              const { lessonError, lessonTouched } = {
                lessonError: getIn(errors, `lessons[${index}].name`),
                lessonTouched: getIn(touched, `lessons[${index}].name`),
              }
              return (
                <div className='lesson-form-control' key={index}>
                  <Field name={`lessons[${index}].name`}>
                    {({ field }) => {
                      return (
                        <>
                          <TextField
                            type='text'
                            id={`lessons[${index}].name`}
                            variant='filled'
                            error={lessonError && lessonTouched}
                            helperText={
                              lessonError && lessonTouched && lessonError
                            }
                            label='lesson name'
                            {...field}
                          />
                        </>
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
              )
            })}
            <div className='lesson-form-add-btn'>
              <IconButton
                aria-label='add'
                variant='contained'
                color='success'
                onClick={() => arrayHelper.push({ name: '', difficulty: '' })}
              >
                <AddIcon />
              </IconButton>
            </div>

            <div className='lesson-next-button'>
              <Button
                variant='text'
                color='primary'
                onClick={handleNext}
                disabled={disabledHandler}
              >
                next
              </Button>
            </div>
          </>
        )
      }}
    </FieldArray>
  )
}

export default LessonsForm
