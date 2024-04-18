import RoadPath from '@/components/road-path.component'
import React from 'react'

const RoadMap = ({params}: {params: {routineId: string}}) => {
  return (
    <div className='min-h-full'>
      <RoadPath routineId={params.routineId}/>
    </div>
  )
}

export default RoadMap
