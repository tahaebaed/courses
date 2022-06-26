import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { Field } from 'formik'
import React from 'react'

const SelectInput = ({ name, errors, values, ...rest }) => {
  const difficulties = ['beginner', 'intermediate', 'advanced']

  return (
    <FormControl sx={{ minWidth: 150 }}>
      <InputLabel id={name}>difficulty</InputLabel>
      <Field id={name} name={name} {...rest}>
        {({ field, form }) => (
          <>
            <Select
              labelId={name}
              id='demo-simple-select'
              label='difficulty'
              {...field}
            >
              {difficulties.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </Field>
    </FormControl>
  )
}

export default SelectInput
