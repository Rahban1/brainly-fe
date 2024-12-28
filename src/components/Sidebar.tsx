import { AllIcon } from "../icons/AllIcon";
import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { TweetIcon } from "../icons/TweetIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({ onSelectItem } : {onSelectItem : (item : string) => void}) {
  return (
    <div className="border-r border-gray-200 h-full">
      <div className="flex gap-2 text-xl font-bold pl-8 pt-8">
        <BrainIcon/>
        Second Brain
      </div>
      <div className="pt-8 ">
        <SidebarItem text="All" leftIcon={<AllIcon/>} onClick={() => onSelectItem("All")}/>
        <SidebarItem text="Tweets" leftIcon={<TweetIcon/>} onClick={() => onSelectItem("Tweets")}/>
        <SidebarItem text="Videos" leftIcon={<YoutubeIcon/>} onClick={() => onSelectItem("Videos")}/>
        <SidebarItem text="Documents" leftIcon={<DocumentIcon/>} onClick={() => onSelectItem("Documents")}/>
      </div>
    </div>
  )
}
