import React from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    ModalHeader?: string;
    width?: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, ModalHeader, width, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
            }}
            onClick={onClose} // Close on backdrop click
        >
            <div
                className={`bg-card text-card-foreground p-5 rounded-lg shadow-md space-y-6`}
                style={{width: width || '550px'}}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className={`modal-header flex justify-between font-bold font-sans text-lg w-full`}>
                    <h2 className=''>{ModalHeader || 'Modal Title'}</h2>
                    <button onClick={onClose} className='cursor-pointer'>X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal
