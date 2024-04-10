import { UserType } from '@/types/user.type';
import { Button, Input, Modal, Flex, Typography} from 'antd';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import React, { useState } from 'react'

interface PropsType {
    open: boolean;
    setOpen: (etat: boolean) => void;
    user: UserType
}

const {Text } = Typography

const AddCategoryModal = ({open, setOpen, user}: PropsType) => {
    const [showEmojis, setShowEmojis] = useState<boolean>(false)
    const [emoji, setEmoji] = useState<string>('🗃️')
    const [label, setLabel] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const onOk = async () => {
        setLoading(true)
        try{
            await fetch('/api/firebase/add-category',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
					uid: user.uid,
                    emoji,
                    label,
                })
            })
        }catch(error){
            console.error(error)
        }finally{
            setOpen(false)
            setLoading(false)
        }
    }

    const footer = (_: any, { OkBtn, CancelBtn }: { OkBtn: React.FC, CancelBtn: React.FC }) => (
		<>
			<Button type='primary' color='cyan' onClick={() => { setShowEmojis(true) }}>Change Emoji</Button>
			<CancelBtn />
			<Button type='primary' color='green' loading={loading} onClick={onOk}>Add category</Button>
		</>
	)

    return (
        <Modal
            title='Add Category'
            open={open}
            onCancel={() => setOpen(false)}
            footer={footer}
        >
            <Flex gap='small' align='center'>
                <Text>{emoji}</Text>
                <Input onChange={(event) => setLabel(event.target.value)} value={label}/>
            </Flex>
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

export default AddCategoryModal
