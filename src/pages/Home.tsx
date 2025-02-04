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
      <div className='w-full h-screen bg-black overflow-hidden flex flex-col'>
        <Navbar/>
        <div className='flex-1 flex justify-center items-center text-center text-white px-4'>
          <div className='max-w-4xl w-full'>
            <div className='text-3xl sm:text-5xl md:text-7xl font-head mb-2 md:mb-4'>Your Mind's Archive</div>
            <div className='text-xs sm:text-sm md:text-lg font-body w-[90%] sm:w-[75%] mx-auto text-gray-300 mb-2 md:mb-4'>
              Save & Revisit Your Favorite things on the Internet Effortlessly
            </div>
            <div className='flex justify-center flex-col items-center gap-2 md:gap-4'>
              <div className='w-[60%] sm:w-[50%] max-w-xl mx-auto'>
                <img 
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3AxbjQ5YnZ5YnF6dTczMG5wMDA4eXR5Z28xbXpvOGNuOHgzcHRzaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YS57N6teaevJASvcMA/giphy.gif" 
                  alt="brain image"
                  className="w-full h-auto" 
                />
              </div>
              <button 
                onClick={handleStartCollecting} 
                className="w-[90%] sm:w-auto mx-auto relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm md:text-lg font-semibold rounded-lg group 
                         bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                         hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                         transition-all duration-300 ease-in-out 
                         transform hover:scale-105
                         shadow-lg hover:shadow-xl
                         md:min-w-[200px] max-w-md"
              >
                <span className="relative w-full px-3 md:px-8 py-1.5 md:py-2.5 transition-all ease-in duration-200 
                               rounded-md bg-black/50
                               group-hover:bg-opacity-0 
                               flex items-center justify-center gap-2 md:gap-3">
                    <svg 
                        className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" 
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
                    <span className="text-xs md:text-lg font-medium">Start Collecting</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
