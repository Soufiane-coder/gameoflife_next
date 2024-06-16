import React, { useEffect, useState } from 'react'
import { addRoutine, editRoutine } from '@/redux/features/routinesSlice'
import { useAppDispatch } from '@/redux/hooks'
import RoutineType from '@/types/routine.type'
import { Modal, Form, Input, Select, Slider, Button } from 'antd'
import { PriorityType } from '@/types/general.type'
import dayjs from 'dayjs'
import { daysSchedule } from '@/utils'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import randomColor from 'randomcolor'
import styled from '@/components/add-routine-modal/add-routine-modal.module.scss'
import { UserType } from '@/types/user.type'

const { TextArea } = Input

interface PropsType {
	open: boolean;
	setOpen: (etat: boolean) => void;
	user: UserType;
	routineToEdit ?: RoutineType
}

const AddRoutineModal = ({ open, setOpen, user, routineToEdit }: PropsType) => {
	const [form] = Form.useForm()
	const [showEmojis, setShowEmojis] = useState<boolean>(false)
	const [emoji, setEmoji] = useState<string>(routineToEdit?.emoji || '')
	const [bgEmojiColor, setBgEmojiColor] = useState<string>(routineToEdit?.bgEmojiColor || randomColor())
	const [loading, setLoading] = useState<boolean>(false)
	const dispatch = useAppDispatch();

	const initialValues: RoutineType = routineToEdit ? {...routineToEdit} : {
		title: "",
		description: "",
		message: "",
		priority: PriorityType.LOW,
		level: 1,
		rangeTime: [
			dayjs(0),
			dayjs(0),
		],
		days: daysSchedule.map(day => day.value),
		emoji: "",
		isArchived: false,
		skip: 0,
		combo: 0,
		isSubmitted: false,
		categoryId: '',
		lastSubmit: dayjs(0),
		bgEmojiColor: '#ffffff',
		character: '',
		spentedTime: dayjs(0),
	}

	const onFinishAdding = async (newRoutine: RoutineType) => {
		newRoutine = { ...initialValues, ...newRoutine, bgEmojiColor, emoji }
		try {
			setLoading(true)
			const res = await fetch('/api/firebase/add-routine', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ 
					uid: user.uid,
					routine: newRoutine,
				})
			})
			const routineId = await res.json()
			dispatch(addRoutine({...newRoutine, routineId}))
		}
		catch (err) {
			console.error(err)
		}
		finally{
			setLoading(false)
			form.resetFields();
			setEmoji(routineToEdit?.emoji || '')
			setBgEmojiColor(routineToEdit?.bgEmojiColor || '#fff')
			setOpen(false)
		}
	}

	const onFinishEditing = async (newRoutine: RoutineType) => {
		newRoutine = { ...initialValues, ...newRoutine, bgEmojiColor, emoji }
		try{
			setLoading(true)
			await fetch('/api/firebase/edit-routine', {
				method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
					uid: user.uid,
                    routine: newRoutine,
                })
			})
			dispatch(editRoutine(newRoutine))
		}catch(error){
			console.error(error)
		}finally{
			setLoading(false)
			form.resetFields();
			setEmoji(routineToEdit?.emoji || '')
			setBgEmojiColor(routineToEdit?.bgEmojiColor || '#fff')
			setOpen(false)
		}
	}

	const onOk = () => {
		form.submit()
	}
	const prioritiesOptions: { value: PriorityType, label: string }[] = [
		{ value: PriorityType.LOW, label: 'Low' },
		{ value: PriorityType.MEDIUM, label: 'Medium' },
		{ value: PriorityType.IMPORTANT, label: 'Important' },
	]

	// let categoriesOption = categories.map(category => ({label: `${category.emoji} ${category.label}`, value: category.categoryId}))
	let categoriesOption: any = []

	categoriesOption = [{ value: '', label: 'Default' }, ...categoriesOption]

	let selectSortOptions = [
		{ value: "difficulty", label: "Difficulty" },
		{ value: "priority", label: "Priority" },
	];

	const footer = (_: any, { OkBtn, CancelBtn }: { OkBtn: React.FC, CancelBtn: React.FC }) => (
		<>
			<Button type='primary' color='cyan' onClick={() => { setShowEmojis(true) }}>Change Emoji</Button>
			<CancelBtn />
			<Button type='primary' color='green' loading={loading} onClick={onOk}>{routineToEdit ? 'Edit Routine' : 'Add Routine'}</Button>
		</>
	)

	return (
		<Modal
			title={routineToEdit ? 'Edit Routine ' : 'Add Routine'}
			open={open}
			onOk={onOk}
			footer={footer}
			onCancel={() => {
				setOpen(false);
				setEmoji(routineToEdit?.emoji || '')
				setBgEmojiColor(routineToEdit?.bgEmojiColor || '#fff')}}
		>
			{/* <HexColorPicker color={bgEmojiColor} onChange={setBgEmojiColor} /> */}
			<Button
				onClick={() => setBgEmojiColor(randomColor())}
				style={{ backgroundColor: bgEmojiColor }}
				className={styled.button}>
				{emoji}
			</Button>

			<Form
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 18 }}
				form={form}
				initialValues={initialValues} layout="horizontal" onFinish={routineToEdit ? onFinishEditing : onFinishAdding}
				name={routineToEdit ? routineToEdit.routineId : 'Add routine form'}>
				{/* name is used for not throwing error when you open more form with the same name */}
				<Form.Item name="title" label="Title"
					rules={[{ required: true, message: 'Please input the title!' }]}>
					<Input />
				</Form.Item>
				<Form.Item name="description" label="Description"
					rules={[{ required: true, message: 'Please input the description!' }]}>
					<TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
				</Form.Item>
				<Form.Item name="message" label="Message">
					<TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
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
						options={categoriesOption}
					/>
				</Form.Item>
			</Form>
			<Modal
				open={showEmojis}
				onCancel={
					() => setShowEmojis(false)
				}
				closable={false}
				footer={false}
				width={'fit-content'}
			>
				<Picker data={data} onEmojiSelect={(obj: any) => { setShowEmojis(false); setEmoji(obj.native) }} />
			</Modal>
		</Modal>
	)
}

export default AddRoutineModal
