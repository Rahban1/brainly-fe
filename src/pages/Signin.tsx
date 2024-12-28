import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useRef, useEffect } from 'react';
import { Input } from '../components/Input';
import { BACKEND_URL } from '../config';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Signin = () => {

    const userNameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);
//@ts-ignore
    async function signin(event ){
      event.preventDefault()
        const username = userNameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            console.log("Signing in with:", { username, password });
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                username,
                password
            })
            //@ts-ignore
            const jwt= response.data?.token;
            localStorage.setItem("token",jwt);
            navigate('/dashboard', { replace: true });
            alert("You have been signed in");
        } catch (e) {
            console.log(e);
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
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <form className="bg-gray-50 p-6 rounded-md">
          
          <Input
            placeholder='Enter your username'
            reference={userNameRef}
          />
          <Input
            type='password'
            placeholder='Enter your password'
            reference={passwordRef}
          />
          <div className='flex justify-center items-center'>
            <Button text='Sign In' onclick={(event)=>signin(event)} variants='primary' />
          </div>
        </form>
        <p className="mt-4 text-center">
          Create a new account <a href="/signup" className="text-[#4F45E4]">Sign Up</a>
        </p>
      </div>
    </motion.div>
  );
};
