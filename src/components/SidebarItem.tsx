import { ReactElement } from "react";

export function SidebarItem({leftIcon, text, onClick} : {leftIcon? : ReactElement, text : string, onClick?: () => void}) {
  return (
    <div className="flex gap-4 ml-8 pl-2 mb-2 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-56 transition-all duration-150" onClick={onClick}>
        {leftIcon}
        {text}
    </div>
  )
}

