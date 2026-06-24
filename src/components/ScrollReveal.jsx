import { motion } from 'framer-motion'

const directions = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { y: 0, x: 30 },
  right: { y: 0, x: -30 },
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}
