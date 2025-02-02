import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleStartCollecting = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/signin');
        }
    };

    return (
      <div className='w-full h-screen bg-white dark:bg-gray-800'>
        <Navbar/>
        <div className='flex justify-center mt-14 items-center text-center dark:text-white'>
          <div>
            <div className='text-5xl font-head my-2 md:my-4 md:text-7xl'>Your Mind's Archive</div>
            <div className='text-sm md:text-lg font-body w-[75%] mx-auto text-gray-500 mb-2 md:mb-4'>Save & Revisit Your Favorite things on the Internet Effortlessly</div>
            <div className='flex justify-center'>
                <button 
                    onClick={handleStartCollecting}
                    className="px-4 py-2 bg-[#4F45E4] text-white rounded-lg hover:bg-[#251ba8]"
                >
                    Start Collecting
                </button>
            </div>
          </div>
        </div>
      </div>
    );
}
