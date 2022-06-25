import { TextField } from '@mui/material'
import { Field } from 'formik'
import React from 'react'

const TheFieldText = ({ fieldName, formError, formValues, label, ...rest }) => (
  <Field name={fieldName}>
    {({ field, form }) => (
      <TextField
        type='text'
        id={fieldName}
        variant='filled'
        error={form.errors[fieldName] && form.touched[fieldName]}
        helperText={
          form.errors[fieldName] &&
          form.touched[fieldName] &&
          form.errors[fieldName]
        }
        label={label}
        {...field}
        {...rest}
      />
    )}
  </Field>
)

export default TheFieldText
