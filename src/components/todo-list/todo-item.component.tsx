
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import {Col, Checkbox, Button} from 'antd';
import {EditOutlined,LoadingOutlined, DeleteOutlined} from '@ant-design/icons'
import { Popconfirm } from 'antd'
import { UserType } from "@/types/user.type";
import { todoItemType } from "./todo-list.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";

type PropsType = {
    todoItem: todoItemType,
    setTodoList: Dispatch<SetStateAction<todoItemType[]>>,
    user: UserType;
}

const ToDoItem : React.FC<PropsType> = ({todoItem: thisToDoItem, setTodoList, user}) => {
    const [loadingDelete, setLoadingDelete] = useState(false)

    // const handleTodoItemInput = (event) => {
    //     const {target: {value}} = event
    //     setTodoItemInput(value)
    // }


    const handleCheckTodoItem = async (event : CheckboxChangeEvent) => {
        const {checked} = event.target;

        try{
            const res = await fetch('/api/firebase/todo-list/change-todo-item', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todoItemId: thisToDoItem.todoItemId,
                    isAchieved : checked,
                })
            })
            await res.json()
            setTodoList(old => old.map(todoItem => (todoItem.todoItemId === thisToDoItem.todoItemId ? {...todoItem, isAchieved : checked} : todoItem)))
        }catch(error){
            console.error(error)
        }

        // changeTodoItemAttributesInFirebase(user.uid, thisToDoItem.todoItemId, checked)
    }

    const handleDeleteItem = async () => {
        setLoadingDelete(true)
        try{
            const res = await fetch(`/api/firebase/todo-list/delete-todo-item?todoItemId=${thisToDoItem.todoItemId}`, {
                method: 'DELETE',
            })
            const {message} = await res.json()
            console.log(message)
            setTodoList(old => old.filter(todoItem => todoItem.todoItemId !== thisToDoItem.todoItemId))
        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoadingDelete(false)
        }
    }

    const cancelDelete = () => {
        // console.error('Click on no')
    }
    return (
        <>
            <Col span={20}>
                <Checkbox
                    checked={thisToDoItem.isAchieved}
                    onChange={handleCheckTodoItem}
                >{thisToDoItem.description}</Checkbox>
            </Col>
            <Col  span={2}>
                <Button
                    type="text"
                    color=''
                    >
                    <EditOutlined />
                </Button>
            </Col>
            <Col span={2}>
                <Popconfirm
                    title='Delete the task'
                    description='Are you sure to delete this task'
                    onConfirm={handleDeleteItem}
                    onCancel={cancelDelete}
                    okText='Yes'
                    cancelText='No'
                    >
                    <Button
                        type='text'
                        // loading={loadingDelete}
                        danger
                        >
                        {
                            loadingDelete ? <LoadingOutlined/> : <DeleteOutlined />
                        }
                    </Button>
                </Popconfirm>
            </Col>
            
        </>
    )
}

export default ToDoItem;