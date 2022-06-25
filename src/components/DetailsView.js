import React from 'react'

const DetailsView = ({ values, handleBack, handleComplete, ...rest }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div>
        <h2>Course Details</h2>
        <div>
          <p>name: {values.name}</p>
          <p>price: {values.price} $</p>
          <p>duration: {values.duration * 60} min</p>
          <p>instructor name: {values.instructor}</p>
        </div>
      </div>
      <div>
        <h2>content of course</h2>
        {values?.lessons?.map((lesson, index) => (
          <React.Fragment key={index}>
            <h3>lesson {index + 1}</h3>
            <p>name: {lesson.name}</p>
            <p>difficulty: {lesson.difficulty}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  </>
)

export default DetailsView
