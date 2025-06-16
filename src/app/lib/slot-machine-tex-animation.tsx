'use client'

import { motion } from 'framer-motion'

interface SlotMachineTextProps {
  text: string
  className?: string
  delayBetweenChars?: number
  cycles?: number
  cycleDuration?: number
  cycleDelay?: number
}

export const SlotMachineText = ({
  text,
  className = '',
  delayBetweenChars = 0.1,
  cycles = 15,
  cycleDuration = 0.01,
  cycleDelay = 0.01,
}: SlotMachineTextProps) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: cycleDuration,
            repeat: cycles,
            repeatType: "loop",
            repeatDelay: cycleDelay,
            delay: index * delayBetweenChars,
          }}
          onAnimationComplete={() => {
            const element = document.getElementById(`slot-char-${index}`)
            if (element) {
              element.textContent = char === ' ' ? '\u00A0' : char
            }
          }}
          className="inline-block"
          id={`slot-char-${index}`}
        >
          {letters[Math.floor(Math.random() * letters.length)]}
        </motion.span>
      ))}
    </div>
  )
} 