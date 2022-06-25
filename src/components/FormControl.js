import React from 'react'

import CourseDetailForm from './CourseDetailForm'
import DetailsView from './DetailsView'
import LessonsForm from './LessonsForm'

const FormControl = ({ step, ...rest }) => {
  switch (step) {
    case 0:
      return <LessonsForm {...rest} />
    case 1:
      return <CourseDetailForm {...rest} />
    case 2:
      return <DetailsView {...rest} />
    default:
      return 'hello'
  }
}

export default FormControl
