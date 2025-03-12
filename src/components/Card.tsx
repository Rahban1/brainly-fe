import { DeleteIcon } from '../icons/DeleteIcon'
import { YoutubeIcon } from '../icons/YoutubeIcon'
import { DocumentIcon } from '../icons/DocumentIcon'
import { TweetIcon } from '../icons/TweetIcon'
import { Tweet } from 'react-tweet'
import { BACKEND_URL } from '../config'
import axios from "axios"

interface CardProps {
    title : string,
    data? : string,
    link? : string,
    tags? : string[],
    date? : string,
    type : "twitter" | "youtube" | "doc" | "instagram" | "pinterest" | "geeksforgeeks" | "stackoverflow" | "github" | "website",
    onDelete: () => void,
}

// Function to get card style based on content type
function getCardStyle(type: string) {
  switch(type) {
    case 'youtube':
      return {
        borderColor: '#FF0000',
        bgGradient: 'from-red-900/30 to-[#202E4B]'
      };
    case 'twitter':
      return {
        borderColor: '#1DA1F2',
        bgGradient: 'from-blue-900/30 to-[#202E4B]'
      };
    case 'instagram':
      return {
        borderColor: '#E1306C',
        bgGradient: 'from-pink-900/30 via-purple-900/20 to-[#202E4B]'
      };
    case 'pinterest':
      return {
        borderColor: '#E60023',
        bgGradient: 'from-red-900/30 to-[#202E4B]'
      };
    case 'geeksforgeeks':
      return {
        borderColor: '#2F8D46',
        bgGradient: 'from-green-900/30 to-[#202E4B]'
      };
    case 'stackoverflow':
      return {
        borderColor: '#F48024',
        bgGradient: 'from-orange-900/30 to-[#202E4B]'
      };
    case 'github':
      return {
        borderColor: '#6e5494',
        bgGradient: 'from-purple-900/30 to-[#202E4B]'
      };
    case 'doc':
      // Check if it's a LeetCode link
      return {
        borderColor: '#FFA116', // LeetCode orange if it's a LeetCode link
        bgGradient: 'from-amber-900/30 to-[#202E4B]'
      };
    case 'website':
    default:
      return {
        borderColor: '#4F45E4',
        bgGradient: 'from-indigo-900/30 to-[#202E4B]'
      };
  }
}

export function Card(props : CardProps) {
  const cardStyle = getCardStyle(props.type);
  
  return (
    <div className={`bg-gradient-to-b ${cardStyle.bgGradient} w-full rounded-lg shadow-sm border-2 h-fit`} 
         style={{ borderColor: cardStyle.borderColor }}>
        <div className='flex justify-between m-4'>
            <div className='flex gap-1 text-white font-head tracking-wider'>
                <div className='mr-2'>
                    {props.type === 'youtube' && <YoutubeIcon color='#FF0000'/>}
                    {props.type === 'doc' && !props.link?.includes('leetcode.com') && <span className="text-blue-500"><DocumentIcon /></span>}
                    {props.type === 'doc' && props.link?.includes('leetcode.com') && <span className="text-[#FFA116]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </span>}
                    {props.type === 'twitter' && <span className="text-[#1DA1F2]"><TweetIcon /></span>}
                    {props.type === 'instagram' && <span className="text-pink-500">📷</span>}
                    {props.type === 'pinterest' && <span className="text-red-500">📌</span>}
                    {props.type === 'geeksforgeeks' && <span className="text-green-500">🧠</span>}
                    {props.type === 'stackoverflow' && <span className="text-orange-500">💻</span>}
                    {props.type === 'github' && <span className="text-purple-500">🐱</span>}
                    {props.type === 'website' && <span className="text-indigo-500">🌐</span>}
                </div>
                {props.title}
            </div>
            <div className='flex gap-1 text-[#A0A5A6]'>
                <button className='hover:text-red-500' onClick={async ()=>{
                    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                        headers : {
                            Authorization : `Bearer ${localStorage.getItem("token")}`
                        },
                        //@ts-ignore
                        data : { title : props.title }
                    });
                    props.onDelete();
                }}>
                    <DeleteIcon/>
                </button>
            </div>

        </div>

        <div className='m-4 text-white  '>{props.data} </div>
        <div >
            {props.type === 'doc' && props.link?.includes('leetcode.com') && (
                <div className='m-4 p-3 bg-amber-900/20 rounded-md border border-amber-600/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-[#FFA116] mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                        </span>
                        <span className='font-medium text-[#FFA116]'>LeetCode</span>
                        
                        {/* Difficulty indicator based on problem description */}
                        {props.data?.toLowerCase().includes('easy') && 
                            <span className='ml-2 px-2 py-0.5 bg-green-800/30 text-green-500 text-xs rounded-full border border-green-700/30'>Easy</span>}
                        {props.data?.toLowerCase().includes('medium') && 
                            <span className='ml-2 px-2 py-0.5 bg-yellow-800/30 text-yellow-500 text-xs rounded-full border border-yellow-700/30'>Medium</span>}
                        {props.data?.toLowerCase().includes('hard') && 
                            <span className='ml-2 px-2 py-0.5 bg-red-800/30 text-red-500 text-xs rounded-full border border-red-700/30'>Hard</span>}
                    </div>
                    <p className='text-gray-300 text-sm mb-2'>{props.data || 'LeetCode problem'}</p>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-[#FFA116] hover:text-amber-400 mt-2 block'>
                        View LeetCode Problem
                    </a>
                </div>
            )}
            {props.type === 'doc' && !props.link?.includes('leetcode.com') && (
                <div className='m-4 p-3 bg-blue-900/20 rounded-md border border-blue-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-blue-500 mr-2'><DocumentIcon /></span>
                        <span className='font-medium text-blue-500'>
                            {props.link?.includes('pdf') ? 'PDF Document' : 
                             props.link?.includes('docs.google.com') ? 'Google Doc' : 
                             props.link?.includes('notion.so') ? 'Notion Page' : 
                             'Document'}
                        </span>
                    </div>
                    <p className='text-gray-300 text-sm mb-2'>{props.data || 'Saved document'}</p>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:text-blue-400 mt-2 block'>
                        {props.link?.includes('pdf') ? 'View PDF' : 
                         props.link?.includes('docs.google.com') ? 'Open Google Doc' : 
                         props.link?.includes('notion.so') ? 'Open Notion Page' : 
                         'View Document'}
                    </a>
                </div>
            )}
            {props.type === 'instagram' && props.link && (
                <div className='m-4 p-3 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-yellow-900/30 rounded-md border border-pink-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-pink-500 mr-2'>📷</span>
                        <span className='font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text'>Instagram</span>
                    </div>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-pink-500 hover:text-pink-400 mt-2 block'>
                        View Instagram Post
                    </a>
                </div>
            )}
            {props.type === 'pinterest' && props.link && (
                <div className='m-4 p-3 bg-red-900/20 rounded-md border border-red-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-red-500 mr-2'>📌</span>
                        <span className='font-medium text-red-500'>Pinterest</span>
                    </div>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-red-500 hover:text-red-400 mt-2 block'>
                        View Pinterest Pin
                    </a>
                </div>
            )}
            {props.type === 'geeksforgeeks' && props.link && (
                <div className='m-4 p-3 bg-green-900/20 rounded-md border border-green-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-green-500 mr-2'>🧠</span>
                        <span className='font-medium text-green-500'>GeeksForGeeks</span>
                    </div>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-green-500 hover:text-green-400 mt-2 block'>
                        View GeeksForGeeks Article
                    </a>
                </div>
            )}
            {props.type === 'stackoverflow' && props.link && (
                <div className='m-4 p-3 bg-orange-900/20 rounded-md border border-orange-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-orange-500 mr-2'>💻</span>
                        <span className='font-medium text-orange-500'>Stack Overflow</span>
                    </div>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-orange-500 hover:text-orange-400 mt-2 block'>
                        View Stack Overflow Post
                    </a>
                </div>
            )}
            {props.type === 'github' && props.link && (
                <div className='m-4 p-3 bg-purple-900/20 rounded-md border border-purple-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-purple-500 mr-2'>🐱</span>
                        <span className='font-medium text-purple-500'>GitHub</span>
                    </div>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-purple-500 hover:text-purple-400 mt-2 block'>
                        View GitHub Repository
                    </a>
                </div>
            )}
            {props.type === 'website' && props.link && (
                <div className='m-4 p-3 bg-indigo-900/20 rounded-md border border-indigo-700/30'>
                    <div className='flex items-center mb-2'>
                        <span className='text-indigo-500 mr-2'>🌐</span>
                        <span className='font-medium text-indigo-500'>Website</span>
                    </div>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-indigo-500 hover:text-indigo-400 mt-2 block'>
                        Visit Website
                    </a>
                </div>
            )}
            {props.type === 'youtube' && (
                <iframe 
                    className='w-[80%] rounded-md mx-auto' 
                    width="560" 
                    height="315" 
                    src={getYoutubeEmbedUrl(props.link || '')}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                />
            )}
        </div>

        <div>
            {props.type === 'twitter' && props.link && (
                <div className='mx-4 h-[315px] overflow-y-auto'>
                    <Tweet id={getTweetId(props.link)} />
                </div>
            )}
        </div>

        <div className='m-4 flex gap-3'>
            {props.tags?.map((tag) => <div className='text-[#4F45E4] bg-[#DFE7FF] rounded-full p-2 text-sm'>{tag}</div>)}
        </div>
        <p className='m-4 text-sm text-[#A0A5A6]'>Added on {new Date().toLocaleDateString()}</p>
    </div>
  )
}

function getTweetId(tweetUrl: string): string {
    const matches = tweetUrl.match(/x\.com\/\w+\/status\/(\d+)/);
    return matches ? matches[1] : '';
}

function getYoutubeEmbedUrl(url: string): string {
    try {
        // Handle both youtube.com and youtu.be URLs
        const videoId = url.includes('youtu.be') 
            ? url.split('youtu.be/')[1]
            : url.split('v=')[1]?.split('&')[0];
            
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } catch {
        return '';
    }
}
