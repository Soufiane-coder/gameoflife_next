import React from 'react'
import { addRoutine } from '@/redux/features/routinesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { addRoutineToFirebase } from '@/lib/firebase/routine.apis'
import RoutineType from '@/types/routine.type'
import { Modal, Form, Input, Select, Slider } from 'antd'
import { PriorityType } from '@/types/general.type'
import dayjs from 'dayjs'
import { daysSchedule } from '@/utils'

const { TextArea } = Input

const AddRoutineModal = ({open, setOpen, user} : any) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch();

  const initialValues : RoutineType = {
    title: "",
		description: "",
		message: "",
		priority: PriorityType.LOW,
		level: 1,
		rangeTime: [
			dayjs('00:00:00', 'HH:mm:ss'),
			dayjs('00:00:00', 'HH:mm:ss'),
		],
		days: daysSchedule.map(day => day.value),
		emoji: "",
		isArchived: false,
		skip: 0,
		combo: 0,
		isSubmitted: false,
		categoryId : '',
		lastSubmit : dayjs(0),
		bgEmojiColor : '#fff',
		character : '',
		spentedTime: dayjs(0),
  }

  const onFinish = async (newRoutine : RoutineType) => {
    try{
      await addRoutineToFirebase(user.uid, {...initialValues, ...newRoutine})
      dispatch(addRoutine(newRoutine))
    }
    catch(err){
      console.error(err)
    }
    form.resetFields();
    setOpen(false)
  }

  const onOk = () => {
    form.submit()
  }
	const prioritiesOptions : {value: PriorityType, label: string}[] = [
		{value: PriorityType.LOW, label: 'Low'}, 
		{value: PriorityType.MEDIUM , label: 'Medium'},
		{value: PriorityType.IMPORTANT , label: 'Important'},
	]

	// let categoriesOption = categories.map(category => ({label: `${category.emoji} ${category.label}`, value: category.categoryId}))
  let categoriesOption : any = []

	categoriesOption = [{value: '', label: 'Default'}, ...categoriesOption]

	let selectSortOptions = [
		{ value: "difficulty", label: "Difficulty" },
		{ value: "priority", label: "Priority" },
	];

  return (
    <Modal
      title='Add Routine'
      open={open}
      onOk={onOk}
      onCancel={() => setOpen(false)}
    >
      <Form
				labelCol={{ span: 5 }} 
				wrapperCol={{ span: 18 }}
				form={form}
				initialValues={initialValues} layout="horizontal" onFinish={onFinish} name="userForm">
			<Form.Item name="title" label="Title"
				rules={[{ required: true, message: 'Please input the title!' }]}>
				<Input />
			</Form.Item>
			<Form.Item name="description" label="Description"
				rules={[{ required: true, message: 'Please input the description!' }]}>
				<TextArea autoSize={{ minRows: 2, maxRows: 3 }}/>
			</Form.Item>
			<Form.Item name="message" label="Message">
				<TextArea autoSize={{ minRows: 2, maxRows: 3 }}/>
			</Form.Item>
			{/* <Form.Item name="rangeTime" label="Range picker"
				>
				<TimePicker.RangePicker style={{width: '100%'}}/>
			</Form.Item> */}
			<Form.Item name="days" label='Days'
				rules={[{ required: true, message: 'Please input the days!' }]}>
				<Select
					options={daysSchedule}
					mode='tags'
					maxTagCount='responsive'
					// className="add-routine-window__category-input"
					// name='day-schedule'
					// defaultValue={daysSchedule[0]}
					// onChange={handleSelectDays}
					// value={addRoutineForm.days}
					/>
			</Form.Item>
			<Form.Item name="level" label='Difficulty'>
				<Slider
					min={1}
					max={5}
					// className="add-routine-window__difficulty-input"
					// value={addRoutineForm.level}
					// onChange={handleChangeDiff}
				/>
			</Form.Item >
				<Form.Item name="priority" label='Priority'>
					<Select
						options={prioritiesOptions}
					/>
				</Form.Item>
				<Form.Item name="categoryId" label='Category'>
					<Select
							options={categoriesOption }
						/>
				</Form.Item>
			</Form>
    </Modal>
  )
}

export default AddRoutineModal
