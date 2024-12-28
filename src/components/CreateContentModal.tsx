import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Input } from './Input';
import { PlusIcon } from '../icons/PlusIcon';
import { Button } from './Button';
import { BACKEND_URL } from '../config';
import axios from 'axios';

export function CreateContentModal({open, onClose} : {open : boolean, onClose : ()=> void}) {
    const modalRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
    };

    if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
    };
    }, [open, onClose]);

    if (!open) return null;

    async function addcontent() {
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title,
                content,
                link,
                type
            },{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            onClose();
        } catch (error) {
            console.error("Error adding content:", error);
        }
    }

    return createPortal(
    <div
        className="w-screen h-screen bg-slate-600/60 fixed top-0 left-0 flex justify-center items-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
    >
        <div 
        ref={modalRef}
        className="bg-white p-4 rounded-md mx-auto w-96"
        role="document"
        >
        <div className="flex justify-between items-center mb-4">
            <h2 className='font-medium text-xl'>Add content</h2>
            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            aria-label="Close modal"
            >
            ✕
            </button>
        </div>
        
        <div className="text-[#6F7375] mb-4">
            <Input reference={titleRef} placeholder='title...' />
            <Input reference={contentRef} placeholder='content' />
            <Input reference={linkRef} placeholder='links' />
            <Input 
                reference={typeRef} 
                type='select' 
                placeholder='Select type' 
                options={[
                    { value: 'youtube', label: 'YouTube' },
                    { value: 'twitter', label: 'Twitter' },
                    { value: 'doc', label: 'Doc' },
                ]}
            />
        </div>
        <div className='flex justify-center '>
            <Button 
                variants='primary' 
                text='Add To Your Brain' 
                startIcon={<PlusIcon/>} 
                onclick={addcontent}
            />
        </div>


        </div>
    </div>,
    document.body
    );
    }
