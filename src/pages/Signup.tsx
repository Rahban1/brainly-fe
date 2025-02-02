import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { BACKEND_URL } from '../config';
import axios from 'axios'; // Added import statement for axios
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import toast from 'react-hot-toast';

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);
    
    async function signup(e: any) {
        try {
            e.preventDefault();
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            if (!username || !password) {
                toast.error('Please fill in all fields');
                return;
            }
            
            await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
              username,
              password
            });
            
            toast.success('Account created successfully!');
            navigate("/signin");
        } catch (error) {
            toast.error('Error creating account. Username might be taken.');
            console.log(error);
        }
    }

  return (    
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[90vh]"
      >
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Sign Up</h1>
          <form className=" p-6 rounded-md">
            <Input
              placeholder='Enter your username'
              reference={usernameRef}
            />
            <Input
              placeholder='password'
              reference={passwordRef}
              type='password'
            />
            <div className='flex justify-center items-center'>
              <Button onclick={(e)=>signup(e)} text='Sign Up' variants='primary' />
            </div>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Already have an account? {' '}
            <button 
              onClick={()=>{navigate('/signin')}} 
              className="text-[#4F45E4]"
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
