import Modal from '@/components/ui/Modal'
import React, { useState } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    ModalHeader?: string,
    width?: string,
}

const ConnectModal = (props: ModalProps) => {
    const { isOpen, onClose, ModalHeader, width } = props;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        secretKey: '',
        url: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form Submitted:', formData)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} ModalHeader={ModalHeader} width={'550px'} >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
                <div className="modal-content w-full space-y-2">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Enter name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">URL</label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Enter URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Secret Key</label>
                        <input
                            type="password"
                            name="secretKey"
                            value={formData.secretKey}
                            onChange={handleChange}
                            className="border rounded-md p-2 w-full"
                            placeholder="Enter key"
                        />
                    </div>
                </div>
                <div className='modal-footer w-full flex justify-end'>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Modal >
    )
}

export default ConnectModal
