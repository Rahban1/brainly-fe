import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CopyIcon } from "../icons/CopyIcon";
import { Button } from './Button';
import axios from 'axios'
import { BACKEND_URL } from '../config';

export function ShareBrainModal({open, onClose, itemCount} : {open : boolean, onClose : ()=> void, itemCount : number}) {
  const modalRef = useRef(null);

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

  const handleShare = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      //@ts-ignore
      const shareUrl = `${response.data?.hash}`;
      await navigator.clipboard.writeText(shareUrl); // Copy the share URL to clipboard
      alert("Share URL copied to clipboard!"); // Optional: Notify the user
    } catch (error) {
      console.error("Error sharing brain:", error);
    }
  };

  return createPortal(
    <div
      className="w-screen h-screen bg-slate-600/60 fixed top-0 left-0 flex justify-center items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className="bg-white p-4  rounded-md mx-auto  w-96"
        role="document"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className='font-medium text-md'>Share your second brain</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        <div className="text-[#6F7375] mb-4">
          Share your entire collection of notes, documents, tweets, and videos with others. 
          They'll be able to import your content into their Second Brain.
        </div>
        <div className='flex justify-center items-center'>
          <Button 
            onclick={handleShare}
            variants='primary'
            text='Share Brain'
            startIcon={<CopyIcon/>}>

          </Button>
        </div>

        <div className="text-sm text-gray-400 mt-2 text-center">
          {itemCount} items will be shared
        </div>
      </div>
    </div>,
    document.body
  );
}
