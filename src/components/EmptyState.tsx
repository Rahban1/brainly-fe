import { motion } from 'framer-motion';
import { PlusIcon } from '../icons/PlusIcon';

interface EmptyStateProps {
  onAddContent: () => void;
}

export function EmptyState({ onAddContent }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 px-4 mt-8 rounded-xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm text-center"
    >
      <div className="mb-6">
        <motion.div 
          className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-full p-5 border border-purple-500/30"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0] 
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-purple-400"
          >
            <path 
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-white">Your Brain is Empty</h2>
      
      <p className="text-gray-400 mb-6 max-w-md">
        Start building your second brain by adding your favorite tweets, videos, articles, and documents.
      </p>
      
      <motion.button
        onClick={onAddContent}
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-semibold rounded-lg group 
                 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 
                 hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 
                 transition-all duration-300 ease-in-out 
                 transform hover:scale-105
                 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-200 
                       rounded-md bg-gray-800
                       group-hover:bg-opacity-0 
                       flex items-center gap-2 text-white">
          <PlusIcon />
          Add Your First Content
        </span>
      </motion.button>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        {[
          { icon: "🎬", title: "Videos", description: "Save YouTube videos" },
          { icon: "🐦", title: "Tweets", description: "Collect important tweets" },
          { icon: "📄", title: "Documents", description: "Store articles & references" }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
            className="p-4 rounded-lg bg-gray-700/30 border border-gray-600/30"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}