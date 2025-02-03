import { ReactElement } from "react";
import { Loader } from "./Loader";

interface ButtonProps {
    variants : "primary" | "secondary",
    text : string,
    startIcon? : ReactElement
    onclick? : React.MouseEventHandler<HTMLButtonElement>,
    loading? : Boolean
}

const variantClasses = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-700",
    "secondary" : "bg-gray-700 text-purple-400 hover:bg-gray-600"
}

const defaultStyles = "px-3 py-1 rounded-md font-light flex gap-2 mx-1"

export function Button({variants, text, startIcon, onclick, loading} : ButtonProps) {
    return <button onClick={onclick} className={variantClasses[variants] + " " + defaultStyles}>
        {loading ? <Loader/> : <>{startIcon} {text}</> }
    </button>
}