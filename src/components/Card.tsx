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
    type : "twitter" | "youtube" | "doc",
    onDelete: () => void,
}

export function Card(props : CardProps) {
  return (
    <div className='bg-[#202E4B] w-full rounded-lg shadow-sm border h-fit border-gray-200'>
        <div className='flex justify-between m-4'>
            <div className='flex gap-1 text-white font-head tracking-wider'>
                <div className='text-[#A0A5A6] mr-2'>
                    {props.type === 'youtube' && <YoutubeIcon color='#A0A5A6'/>}
                    {props.type === 'doc' && <DocumentIcon/>}
                    {props.type === 'twitter' && <TweetIcon/>}
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
            {props.type === 'doc' && props.link && (
                <div className='m-4'>
                    <a href={props.link} target="_blank" rel="noopener noreferrer" className='text-[#4F45E4] underline hover:text-blue-600'>
                        View Document
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
