import { Palette, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface FloatingControlsProps {
  onClose: () => void
  floatingRef: React.Ref<HTMLDivElement>
}

type Colors = 'Sunset' | 'Ocean' | 'Sky' | 'Mint' | 'Lavender' | 'Peach' | 'Cream' | 'Steel'

export const FloatingControls = ({ onClose, floatingRef }: FloatingControlsProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false)

  const colorOptions: Array<{ name: Colors; color: string }> = [
    { name: 'Sunset', color: '#FF6B6B' },
    { name: 'Ocean', color: '#4ECDC4' },
    { name: 'Sky', color: '#45B7D1' },
    { name: 'Mint', color: '#96CEB4' },
    { name: 'Lavender', color: '#A8E6CF' },
    { name: 'Peach', color: '#FFB5A3' },
    { name: 'Cream', color: '#F8F8F2' },
    { name: 'Steel', color: '#6C7B7F' },
  ]

  return (
    <motion.div
      ref={floatingRef}
      className="fixed top-6 right-6 z-30"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1, type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="bg-paper/90 border-paper-border shadow-paper rounded-2xl border p-2 backdrop-blur-xl">
        <div className="flex flex-col gap-2">
          <motion.button
            className="bg-accent flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg transition-transform"
            onClick={() => setShowColorPicker(!showColorPicker)}
            initial={{ scale: 0, rotate: -90, filter: 'blur(8px)' }}
            animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.2,
              type: 'spring',
              bounce: 0.3,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Palette size={20} />
          </motion.button>

          <div className="bg-border my-1 h-px" />

          <motion.button
            className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
            onClick={onClose}
            initial={{ scale: 0, rotate: -90, filter: 'blur(8px)' }}
            animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.2,
              type: 'spring',
              bounce: 0.3,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>

      {/* Color Picker Dropdown */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            className="bg-paper/95 border-paper-border shadow-paper absolute top-0 right-20 rounded-2xl border p-3 backdrop-blur-xl"
            initial={{ scale: 0.8, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0, x: 20 }}
          >
            <div className="grid w-32 grid-cols-2 gap-2">
              {colorOptions.map((color, index) => (
                <motion.button
                  key={color.name}
                  className="h-12 w-12 rounded-xl border-2 border-white/20 shadow-md transition-transform"
                  style={{ backgroundColor: color.color }}
                  initial={{ scale: 0.25, rotate: -90, filter: 'blur(20px)' }}
                  animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.1,
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
