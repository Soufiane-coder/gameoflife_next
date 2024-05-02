"use client"
import { useAppSelector } from '@/redux/hooks'
import React, { useState } from 'react'


const StatisticRout = ({params}: {params: {routineId : string}}) => {
    const {routineId} = params
    const {user} = useAppSelector(state => state.userReducer)
    const [statistics, setStatistics] = useState<any>()

    return (
        <div>
            routine statistic page {user?.displayName} {routineId}
        </div>
    )
}

export default StatisticRout
