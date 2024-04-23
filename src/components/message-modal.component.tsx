import { Modal } from 'antd';
import React from 'react'

interface PropsType {
  open: boolean;
  setOpen: (etat: boolean) => void;
  message: string;
}

const MessageModal = ({message, open, setOpen} : PropsType) => {
  const onOk = () => {
    setOpen(false)
  }
  return (
    <Modal
			title='Your message'
			open={open}
			onOk={onOk}
			onCancel={() => {
				setOpen(false)}}
		>
      <div dangerouslySetInnerHTML={{ __html: message}} />
    </Modal>
  )
}

export default MessageModal
