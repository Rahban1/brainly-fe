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
      <div className='w-full h-full bg-black'>
        <Navbar/>
        <div className='flex justify-center mt-14 items-center text-center text-white'>
          <div>
            <div className='text-5xl font-head my-6 md:my-8 md:text-7xl'>Your Mind's Archive</div>
            <div className='text-sm md:text-lg font-body w-[75%] mx-auto text-gray-300 mb-6 md:mb-8'>
                Save & Revisit Your Favorite things on the Internet Effortlessly
            </div>
            <div className='flex justify-center flex-col gap-2'>
                <button 
                    onClick={handleStartCollecting} 
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-semibold rounded-lg group 
                             bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                             hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                             transition-all duration-300 ease-in-out 
                             transform hover:scale-105
                             shadow-lg hover:shadow-xl"
                >
                    <span className="relative px-8 py-3 transition-all ease-in duration-200 
                                    rounded-md 
                                   group-hover:bg-opacity-0 
                                   flex items-center gap-2 text-white">
                        <svg 
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                        Start Collecting
                    </span>
                </button>

                <div className='w-[66%] mx-auto'>
                    <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3AxbjQ5YnZ5YnF6dTczMG5wMDA4eXR5Z28xbXpvOGNuOHgzcHRzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YS57N6teaevJASvcMA/giphy.gif" alt="" />
                </div>
            </div>
          </div>
        </div>
      </div>
    );
}
