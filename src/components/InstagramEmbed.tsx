import { InstagramIcon } from '../icons/InstagramIcon';

interface InstagramEmbedProps {
  url: string;
}

export function InstagramEmbed({ url }: InstagramEmbedProps) {
  // Extract the post ID from the URL
  const getPostId = (url: string): string => {
    // Handle both /p/ (regular posts) and /reels/ (reels) URLs
    const regex = /instagram\.com\/(p|reels)\/([^/?]+)/;
    const matches = url.match(regex);
    return matches ? matches[2] : '';
  };

  const postId = getPostId(url);
  
  // Generate the post thumbnail URL
  // We can't use actual Instagram thumbnails due to CORS, so using a gradient placeholder
  
  return (
    <div className="instagram-embed rounded-lg overflow-hidden border border-pink-500/30 shadow-md">
      <div className="p-3 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-yellow-900/30">
        <div className="flex items-center mb-4">
          <div className="rounded-full bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 p-0.5 mr-3">
            <div className="bg-gray-900 rounded-full p-1">
              <InstagramIcon />
            </div>
          </div>
          <div>
            <div className="font-medium text-white">Instagram</div>
            <div className="text-xs text-gray-400">instagram.com</div>
          </div>
        </div>
        
        <div className="relative aspect-square w-full mb-3 rounded-md overflow-hidden bg-gradient-to-tr from-purple-900/50 via-pink-900/50 to-yellow-900/50">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-pink-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="text-center px-4">
              <p className="text-sm opacity-80">Instagram content preview</p>
              <p className="text-xs opacity-60 mt-1">Click below to view the original post</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex space-x-4 text-gray-300">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Like</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Comment</span>
            </div>
          </div>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-yellow-600/10 px-4 py-3 font-medium">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex justify-center items-center text-pink-400 hover:text-pink-300 transition-colors"
        >
          <span className="mr-2">View on Instagram</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}