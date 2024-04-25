import React, { Dispatch, SetStateAction, useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { UserType } from '@/types/user.type';
import { GoalStatus, GoalType, GoalTypeAttrs } from '@/types/routine.type';
import dayjs from 'dayjs';

interface PropsType {
    open: boolean;
    setOpen: (etat: boolean) => void;
    uid: string;
    setGoals: Dispatch<SetStateAction<GoalType[] | null>>;
    routineId: string; 
}

const AddGoalModal : React.FC<PropsType> = ({open, setOpen, uid, setGoals, routineId}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const initialValues : GoalType= {
        label : '',
        description: '',
        status: GoalStatus.WAITING,
        type: GoalTypeAttrs.SUBGOAL,
    }

    const onFinish = async (newGoal : any) => {
        newGoal = {...initialValues, ...newGoal, created: dayjs(new Date())}
        setLoading(true)
        try{
            const goalId = await fetch('/api/firebase/add-goal', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    uid,
                    routineId,
                    goal: newGoal,
                })
            })
            setGoals((old) => old && [...old, {...newGoal, goalId}])
        }catch(err){
            console.error(err)
        }finally{
            setLoading(false)
            form.resetFields()
            setOpen(false)
        }
        
    }

    const onOk = () => {
        form.submit()
    }

  return (
    <Modal
        title='Add goal'
        open={open}
        onOk={onOk}
        confirmLoading={loading}
        onCancel={() => {setOpen(false); form.resetFields();}}>
            <Form
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 18 }}
				form={form}
				initialValues={initialValues}
                layout="horizontal"
                onFinish={onFinish}
                name="userForm">
				<Form.Item name="label" label="Label"
					rules={[{ required: true, message: 'Please input the title!' }]}>
					<Input />
				</Form.Item>
				<Form.Item name="description" label="Description"
					rules={[{ required: true, message: 'Please input the description!' }]}>
					<Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
				</Form.Item>
				<Form.Item name="type" label="Type">
					<Select options={[{value: GoalTypeAttrs.SUBGOAL, label: 'Sub goal'}, {value: GoalTypeAttrs.SMALLGOAL, label: 'Small goal'}, {value: GoalTypeAttrs.BIGGOAL, label: 'Big goal'}]}/>
				</Form.Item>
            </Form>
    </Modal>
  )
}

export default AddGoalModal
