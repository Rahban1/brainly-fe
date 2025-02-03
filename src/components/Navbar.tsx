import { useNavigate } from "react-router-dom";

export function Navbar() {
    const navigate = useNavigate();

    return (
        <div className=" w-full flex justify-between items-center px-2 md:px-8 py-3 bg-black">
            <div className="flex justify-center items-center gap-1">
                <button onClick={() => { navigate('/') }}>
                    <img className="w-10 h-10" src="/brain.svg" alt="logo" />
                </button>
                <div onClick={()=> {navigate('/')}} className="cursor-pointer text-lg font-head hidden sm:block text-white">
                    Recollectify
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => { navigate('/signin')}} 
                    className="relative mt-2 ml-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden md:text-lg font-semibold rounded-lg group 
                             bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                             hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                             transition-all duration-300 ease-in-out 
                             transform hover:scale-105
                             shadow-lg hover:shadow-xl"
                >
                    <span className="relative px-2 py-1 transition-all ease-in duration-200 
                                   rounded-md bg-gray-800
                                   group-hover:bg-opacity-0 
                                   flex items-center gap-2 text-white">
                        Log In
                    </span>
                </button>
                <button 
                    onClick={() => { navigate('/signup')}} 
                    className="relative mt-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden md:text-lg font-semibold rounded-lg group 
                             bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                             hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                             transition-all duration-300 ease-in-out 
                             transform hover:scale-105
                             shadow-lg hover:shadow-xl"
                >
                    <span className="relative px-2 py-1 transition-all ease-in duration-200 
                                   rounded-md bg-gray-800
                                   group-hover:bg-opacity-0 
                                   flex items-center gap-2 text-white">
                        Register
                    </span>
                </button>
            </div>
        </div>
    );
}
