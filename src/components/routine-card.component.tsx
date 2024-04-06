import RoutineType from '@/types/routine.type'
import React from 'react'

const RoutineCard = ({routine} : {routine : RoutineType}) => {
  return (
    <div>
      <h5>{routine.title}</h5>
    </div>
  )
}

export default RoutineCard
