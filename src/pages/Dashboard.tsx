import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { useNavigate } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { BrainIcon } from "../icons/BrainIcon";

// Define a type for the content items
type ContentItem = {
  type: "twitter" | "youtube" | "doc";
  link: string;
  title: string;
  content: string;
};

export function Dashboard() {
  const [isopen, setIsOpen] = useState(false);
  const [isopen2, setIsOpen2] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedItem, _] = useState("All");
  const content: ContentItem[] = useContent(refreshTrigger);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleContentChange = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
      <div className=" bg-[#F8FBFC] h-screen">
        <div className="flex justify-between mx-4 my-6 items-center">
          <div className="flex justify-center items-center">
            <div className="flex gap-2 text-3xl font-bold pl-8 pt-2 text-[#4E44E3]">
            <BrainIcon/>
            Second Brain
            </div>

          </div>
          <div className="flex ">
            <Button
              text="Share Brain"
              onclick={() => setIsOpen(true)}
              variants="secondary"
              startIcon={<ShareIcon />}
            ></Button>
            <Button
              text="Add Content"
              onclick={() => {
                setIsOpen2(true);
                handleContentChange();
              }}
              variants="primary"
              startIcon={<PlusIcon />}
            ></Button>
            <Button text="Logout" onclick={handleLogout} variants="secondary" />
          </div>
        </div>
        <ShareBrainModal open={isopen} onClose={() => setIsOpen(false)} itemCount={content.length} />
        <CreateContentModal open={isopen2} onClose={() => {
          setIsOpen2(false);
          handleContentChange();
        }} />
        <div className="grid grid-cols-3 gap-4 mx-4">
          {content
            .filter(item => selectedItem === "All" || item.type === selectedItem)
            .map(({ type, link, title, content }: ContentItem) => (
              <div key={title} className="col-span-1 ">
                <Card title={title} type={type} link={link} data={content} onDelete={handleContentChange} />
              </div>
            ))}
        </div>
      </div>
  );
}
