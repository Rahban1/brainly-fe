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
    "primary" : "bg-[#4F45E4] text-white",
    "secondary" : "bg-[#DFE7FF] text-[#4F45E4]"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex gap-2 m-2 "

export function Button({variants, text, startIcon, onclick, loading} : ButtonProps){
    return <button onClick={onclick} className={variantClasses[variants] + " " + defaultStyles }>
        {loading ? <Loader/> : <>{startIcon} {text}</> }
        
        </button>
}