import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export function Navbar() {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div className="w-full flex justify-between items-center px-8 py-3 bg-white dark:bg-black ">
            <div className="flex justify-center items-center gap-1">
                <button onClick={() => { navigate('/') }}>
                    <img className="w-10 h-10" src="/brain.svg" alt="logo" />
                </button>
                <div onClick={()=> {navigate('/')}} className=" cursor-pointer font-head hidden sm:block text-gray-900 dark:text-white">Recollectify</div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                    {darkMode ? '🌞' : '🌙'}
                </button>
                <button 
                    onClick={() => { navigate('/signin')}} 
                    className="relative mt-2 ml-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-semibold rounded-lg group 
                             bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                             hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                             transition-all duration-300 ease-in-out 
                             transform hover:scale-105
                             shadow-lg hover:shadow-xl"
                >
                    <span className="relative px-2 py-1 transition-all ease-in duration-200 
                                    rounded-md 
                                   group-hover:bg-opacity-0 
                                   flex items-center gap-2">
                        Log In
                    </span>
                </button>
                <button 
                    onClick={() => { navigate('/signup')}} 
                    className="relative mt-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-semibold rounded-lg group 
                             bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                             hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                             transition-all duration-300 ease-in-out 
                             transform hover:scale-105
                             shadow-lg hover:shadow-xl"
                >
                    <span className="relative px-2 py-1 transition-all ease-in duration-200 
                                    rounded-md 
                                   group-hover:bg-opacity-0 
                                   flex items-center gap-2">
                        Register
                    </span>
                </button>
            </div>
        </div>
    );
}
