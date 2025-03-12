import { useState, useEffect } from "react"
import { Card } from "../components/Card"
import { ShareBrainModal } from "../components/ShareBrainModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { CreateContentModal } from "../components/CreateContentModal"
import { useNavigate } from "react-router-dom"
import { useContent } from "../hooks/useContent"
import toast from "react-hot-toast"
import { LogOutIcon } from "lucide-react"
import { TypeFilterBar } from "../components/FilterBar"
import { EmptyState } from "../components/EmptyState"

// Define a type for the content items
type ContentItem = {
  type: "twitter" | "youtube" | "doc" | "instagram" | "pinterest" | "geeksforgeeks" | "stackoverflow" | "github" | "website"
  link: string
  title: string
  content: string
}

export function Dashboard() {
  const [isopen, setIsOpen] = useState(false)
  const [isopen2, setIsOpen2] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedItem, setSelectedItem] = useState("All")
  const content: ContentItem[] = useContent(refreshTrigger)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/signin")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Successfully logged out")
    navigate("/signin")
  }

  const handleContentChange = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full bg-gray-800 px-4 py-3 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={() => { navigate('/') }}>
              <img className="w-10 h-10" src="/brain.svg" alt="logo" />
            </button>
            <div onClick={() => { navigate('/') }} className="cursor-pointer text-lg font-head hidden sm:block text-white">
              Recollectify
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setIsOpen(true) }} 
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden md:text-lg font-semibold rounded-lg group 
                       bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                       hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                       transition-all duration-300 ease-in-out 
                       transform hover:scale-105
                       shadow-lg hover:shadow-xl"
            >
              <span className="relative px-2 py-1 transition-all ease-in duration-200 
                             rounded-md 
                             group-hover:bg-opacity-0 
                             flex items-center gap-2 text-white sm:hidden">
                <ShareIcon/>
              </span>
              <span className="relative px-2 py-1 transition-all ease-in duration-200 
                             rounded-md bg-gray-800
                             group-hover:bg-opacity-0 
                             sm:flex items-center gap-2 text-white hidden">
                <ShareIcon/>
                Share Brain
              </span>
            </button>

            <button 
              onClick={() => {
                setIsOpen2(true)
                handleContentChange()
              }} 
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden md:text-lg font-semibold rounded-lg group 
                       bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                       hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                       transition-all duration-300 ease-in-out 
                       transform hover:scale-105
                       shadow-lg hover:shadow-xl"
            >
              <span className="relative px-2 py-1 transition-all ease-in duration-200 
                             rounded-md bg-gray-800
                             group-hover:bg-opacity-0 
                             sm:flex items-center gap-2 text-white hidden">
                <PlusIcon/>
                Add Content
              </span>
              <span className="relative px-2 py-1 transition-all ease-in duration-200 
                             rounded-md
                             group-hover:bg-opacity-0 
                             flex items-center gap-2 text-white sm:hidden">
                <PlusIcon/>
              </span>
            </button>

            <button 
              onClick={handleLogout} 
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden md:text-lg font-semibold rounded-lg group 
                       bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                       hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                       transition-all duration-300 ease-in-out 
                       transform hover:scale-105
                       shadow-lg hover:shadow-xl"
            >
              <span className="relative px-2 py-1 transition-all ease-in duration-200 
                             rounded-md sm:hidden
                             group-hover:bg-opacity-0 
                             flex items-center gap-2 text-white">
                <LogOutIcon/>
              </span>
              <span className="relative px-2 py-1 transition-all ease-in duration-200 
                             rounded-md bg-gray-800
                             group-hover:bg-opacity-0 
                             sm:flex items-center gap-2 text-white hidden">
                <LogOutIcon/>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {content.length > 0 ? (
          <>
            <TypeFilterBar 
              selectedType={selectedItem} 
              setSelectedType={setSelectedItem} 
              contentTypes={content.map(item => item.type)}
            />
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {content
                .filter((item) => selectedItem === "All" || item.type === selectedItem.toLowerCase())
                .map(({ type, link, title, content }: ContentItem) => (
                  <div key={title} className="break-inside-avoid">
                    <Card title={title} type={type} link={link} data={content} onDelete={handleContentChange} />
                  </div>
                ))}
            </div>
          </>
        ) : (
          <EmptyState onAddContent={() => setIsOpen2(true)} />
        )}
        <ShareBrainModal open={isopen} onClose={() => setIsOpen(false)} itemCount={content.length} />
        <CreateContentModal
          open={isopen2}
          onClose={() => {
            setIsOpen2(false)
            handleContentChange()
          }}
        />
      </div>
    </div>
  )
}