import React from 'react'
import { PiCheckBold } from "react-icons/pi";
import { MdMoreHoriz } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { Card, Button, Dropdown } from 'antd'
import { PiArrowArcRightBold } from "react-icons/pi";
import { GoGoal } from "react-icons/go";



const RoutineLoading = () => {
  return (
    <div className='w-[22rem] h-52 mt-12'>
        <Card
            loading={true}
          actions={[
            <Button
                key='check'
                icon={<PiCheckBold/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>,
              <Button
                key='skip'
                color='cyan'
                icon={< PiArrowArcRightBold/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>,
              <Button
                key='message'
                color='orange'
                icon={<TbMessage/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>,
              <Button
                key='path-goal'
                color='rose'
                icon={<GoGoal/>}
                className='min-h-10 min-w-10 p-0'
                type='primary'/>,
              <Dropdown menu={{items: []}} placement="top" key='other-menu'>
                  <Button
                    type="text"
                    className='min-h-10 min-w-10 p-0'
                    icon={<MdMoreHoriz/>}
                    />
              </Dropdown>
          ]}
          >
        </Card>
    </div>
  )
}

export default RoutineLoading
