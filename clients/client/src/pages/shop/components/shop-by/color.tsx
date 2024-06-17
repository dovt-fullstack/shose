import { useState } from 'react'
import { motion } from 'framer-motion'
import { NavTitle, colors } from '../..'

export const Color = () => {
  const [showColors, setShowColors] = useState(true)
  return (
    <div>
      <div onClick={() => setShowColors(!showColors)} className='cursor-pointer'>
        <NavTitle title='Shop by Color' icons={true} />
      </div>
      {showColors && (
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
            {colors.map((item) => (
              <li key={item._id} className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2'>
                <span style={{ background: item.base }} className={`w-3 h-3 bg-gray-500 rounded-full`}></span>
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
