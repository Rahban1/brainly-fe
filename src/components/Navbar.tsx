import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useTheme } from "../context/ThemeContext";

export function Navbar() {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div className="w-full flex justify-between items-center px-2 py-3 bg-white dark:bg-gray-800">
            <div className="flex justify-center items-center gap-1">
                <button onClick={() => { navigate('/') }}>
                    <img className="w-10 h-10" src="/brain.svg" alt="logo" />
                </button>
                <h3 className="font-head hidden sm:block text-gray-900 dark:text-white">Recollectify</h3>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                    {darkMode ? '🌞' : '🌙'}
                </button>
                <Button variants="primary" text="Log in" onclick={() => { navigate('/signin') }} />
                <Button variants="secondary" text="Register" onclick={() => { navigate('/signup') }} />
            </div>
        </div>
    );
}
