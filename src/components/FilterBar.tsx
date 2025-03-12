import { motion } from 'framer-motion';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { TweetIcon } from '../icons/TweetIcon';
import { DocumentIcon } from '../icons/DocumentIcon';
import { AllIcon } from '../icons/AllIcon';
import { InstagramIcon } from '../icons/InstagramIcon';
import { PinterestIcon } from '../icons/PinterestIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { BookOpen, Code, Globe } from 'lucide-react';

type ContentType = "twitter" | "youtube" | "doc" | "instagram" | "pinterest" | "geeksforgeeks" | "stackoverflow" | "github" | "website";

type TypeFilterBarProps = {
  selectedType: string;
  setSelectedType: (type: string) => void;
  contentTypes: ContentType[];
};

// Define all possible filter options
const allFilterOptions = [
  { id: 'All', label: 'All', icon: <AllIcon /> },
  { id: 'youtube', label: 'YouTube', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-[#FF0000]'}><YoutubeIcon color={selected ? 'white' : '#FF0000'} /></div> },
  { id: 'twitter', label: 'Twitter', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-[#1DA1F2]'}><TweetIcon /></div> },
  { id: 'doc', label: 'Documents', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-blue-500'}><DocumentIcon /></div> },
  { id: 'instagram', label: 'Instagram', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-pink-500'}><InstagramIcon /></div> },
  { id: 'pinterest', label: 'Pinterest', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-red-500'}><PinterestIcon /></div> },
  { id: 'geeksforgeeks', label: 'GeeksForGeeks', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-green-500'}><BookOpen size={20} /></div> },
  { id: 'stackoverflow', label: 'Stack Overflow', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-orange-500'}><Code size={20} /></div> },
  { id: 'github', label: 'GitHub', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-purple-500'}><GithubIcon /></div> },
  { id: 'website', label: 'Websites', icon: (selected: boolean) => <div className={selected ? 'text-white' : 'text-indigo-500'}><Globe size={20} /></div> },
];

export function TypeFilterBar({ selectedType, setSelectedType, contentTypes }: TypeFilterBarProps) {
  // Always include "All" option and filter the other options based on content types
  const availableFilters = allFilterOptions.filter(
    option => option.id === 'All' || contentTypes.includes(option.id.toLowerCase() as ContentType)
  );

  // If no filters match (empty collection), just show "All"
  if (availableFilters.length === 0) {
    availableFilters.push(allFilterOptions[0]);
  }

  return (
    <motion.div 
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-md mb-6 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto py-3 px-4">
        <div className="flex space-x-3 min-w-max">
          {availableFilters.map(option => {
            const isSelected = selectedType === option.id;
            
            return (
              <motion.button
                key={option.id}
                onClick={() => setSelectedType(option.id)}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">
                  {option.icon(isSelected)}
                </span>
                {option.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}