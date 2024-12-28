import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { BACKEND_URL } from '../config';
import axios from 'axios'; // Added import statement for axios
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    console.log("hello");
    

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard"); // Redirect to dashboard if already signed in
        }
    }, [navigate]); // Dependency array to run effect on mount
    
    //@ts-ignore
    async function signup(e ){
        try {
            e.preventDefault()
            console.log("inside signup");
            
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            console.log(username, password);
            
            await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
              username,
              password
            });
            
            navigate("/signin");
        } catch (error) {
            console.log(error);
            console.log("outer catch");
        }
    }

  return (    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="bg-gray-50 p-6 rounded-md">
          
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
        <p className="mt-4 text-center">
          Already have an account? <a href="/signin" className="text-[#4F45E4]">Sign In</a>
        </p>
      </div>
    </motion.div>
  );
};
