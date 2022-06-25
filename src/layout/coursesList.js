import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { pink } from '@mui/material/colors'

import { db } from '../firebase'
import StepperModal from './Modal'

const CoursesList = () => {
  const [coursesList, setCoursesList] = useState([])
  const getCourses = async () => {
    await db.collection('courses').onSnapshot(snapshot => {
      const courses = snapshot.docs.map(course => ({
        id: course.id,
        info: course.data(),
      }))
      setCoursesList([...courses])
    })
  }

  const deleteCourse = async id => {
    await db.collection('courses').doc(id).delete()
  }
  useEffect(() => {
    getCourses()
  }, [])
  return (
    <>
      <div>
        {coursesList?.map(course => (
          <div className='course-info' key={course.id}>
            <img
              className='course-info_img'
              src={
                course.info.instructorImg ||
                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'
              }
              alt={`${course.info.instructor} avatar`}
            />
            <p>{course.info.instructor}</p>
            <p>{course.info.name}</p>
            <p>{course.info.duration * 60} min</p>
            <p>{course.info.price} $</p>
            <IconButton
              aria-label='delete'
              variant='contained'
              sx={{ color: pink[500], mt: 1 }}
              onClick={() => deleteCourse(course.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <StepperModal />
    </>
  )
}

export default CoursesList
