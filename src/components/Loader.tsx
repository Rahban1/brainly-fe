import { motion } from 'framer-motion';

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5 }}
      className="flex items-center justify-center "
    >
      <div className=" rounded-lg shadow-md  flex items-center justify-center">
        <motion.div
          animate={{ rotate: '360deg' }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-8 h-8 border-4 border-white border-dotted rounded-full"
        />
      </div>
    </motion.div>
  )
}
