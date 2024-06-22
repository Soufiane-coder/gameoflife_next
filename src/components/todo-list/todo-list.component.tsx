'use client'
import { Card, Row,  Button, Input,} from 'antd';
import {DeleteOutlined, AppstoreAddOutlined, LoadingOutlined} from '@ant-design/icons';
import { useEffect, useState,} from 'react';
import ToDoItem from './todo-item.component';
import './todo-list.style.scss';
import { useAppSelector } from '@/redux/hooks';
import { UserType } from '@/types/user.type';

type PropsType = {
    className: string,
}

export type todoItemType = {
    todoItemId : string,
    description : string,
    isAchieved: boolean,
}

const ToDoList: React.FC<PropsType> = ({className}) => {

    const [todoList, setTodoList] = useState<todoItemType[]>([])
    const [todoItemInput, setTodoItemInput ] = useState('')

    const {user} = useAppSelector((state) => state.userReducer) as {user: UserType}

    useEffect(() => {
        ;(async () => {
            const res = await fetch('/api/firebase/todo-list/get-todo-list')
            const todoList = await res.json()
            setTodoList(todoList)
        })()

    },[])

    const handleAddingTodoItem = async () => {
        try{
            const res = await fetch('/api/firebase/todo-list/add-todo-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: todoItemInput
                })
            })
            const newTodoItemId = await res.json()
            setTodoList(old => ([...old, {todoItemId : newTodoItemId, description : todoItemInput, isAchieved: false}]))
            setTodoItemInput('')
        }catch(error){
            console.error(error)
        }
    }


    return(
        <div className={`clock-view-page__to-do-list ${className}`}>
            <Card 
                style={{height: '100%'}}
                title='To do list'
                extra={
                <Button
                    type='link'
                    onClick={handleAddingTodoItem}
                    >
                    <AppstoreAddOutlined /> Add to-do item
                </Button>}>
                <Row gutter={[0, 0]}>
                    <Input 
                        placeholder='Write a description to your task'
                        onChange={(event) => setTodoItemInput(event.target.value)}
                        value={todoItemInput}
                    />
                </Row>
                <Row gutter={[0, 0]}>
                    {todoList?.map((todoItem, key) => (
                        <ToDoItem key={key} todoItem={todoItem} setTodoList={setTodoList} user={user}/>
                    ))}
                </Row>
            </Card>
        </div>
    )
}

export default ToDoList