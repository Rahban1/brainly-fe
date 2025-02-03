import { useState, useEffect } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { ShareBrainModal } from "../components/ShareBrainModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { CreateContentModal } from "../components/CreateContentModal"
import { useNavigate } from "react-router-dom"
import { useContent } from "../hooks/useContent"
import { BrainIcon } from "../icons/BrainIcon"
import toast from "react-hot-toast"

// Define a type for the content items
type ContentItem = {
  type: "twitter" | "youtube" | "doc"
  link: string
  title: string
  content: string
}

export function Dashboard() {
  const [isopen, setIsOpen] = useState(false)
  const [isopen2, setIsOpen2] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedItem, _] = useState("All")
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex justify-center items-center gap-1">
                <button onClick={() => { navigate('/') }}>
                    <img className="w-10 h-10" src="/brain.svg" alt="logo" />
                </button>
                <div onClick={()=> {navigate('/')}} className="cursor-pointer text-lg font-head hidden sm:block text-white">
                    Recollectify
                </div>
            </div>
          <div className="flex flex-wrap gap-2">
          <button 
                    onClick={() => { setIsOpen(true) }} 
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
                                    <ShareIcon/>
                        Share Brain
                    </span>
                </button>
            {/* <Button text="Share Brain" onclick={() => setIsOpen(true)} variants="secondary" startIcon={<ShareIcon />} /> */}
            {/* <Button
              text="Add Content"
              onclick={() => {
                setIsOpen2(true)
                handleContentChange()
              }}
              variants="primary"
              startIcon={<PlusIcon />}
            /> */}
            <button 
                    onClick={() => {
                      setIsOpen2(true)
                      handleContentChange()
                    }} 
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
                                    <PlusIcon/>
                        Add Content
                    </span>
              </button>
              <button 
                    onClick={handleLogout} 
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
                        Logout
                    </span>
              </button>
                
            {/* <Button text="Logout" onclick={handleLogout} variants="secondary" /> */}
          </div>
        </div>
        <ShareBrainModal open={isopen} onClose={() => setIsOpen(false)} itemCount={content.length} />
        <CreateContentModal
          open={isopen2}
          onClose={() => {
            setIsOpen2(false)
            handleContentChange()
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content
            .filter((item) => selectedItem === "All" || item.type === selectedItem)
            .map(({ type, link, title, content }: ContentItem) => (
              <div key={title}>
                <Card title={title} type={type} link={link} data={content} onDelete={handleContentChange} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

