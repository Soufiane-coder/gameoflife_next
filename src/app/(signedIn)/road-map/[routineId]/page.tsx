import RoadPath from '@/components/road-path.component'
import React from 'react'

const RoadMap = ({params}: {params: {routineId: string}}) => {
  return (
    <div className='h-[90lvh] max-h-lvh flex justify-center'>
      <RoadPath routineId={params.routineId}/>
    </div>
  )
}

export default RoadMap
