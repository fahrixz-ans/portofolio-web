import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isTouchDevice || prefersReducedMotion) return

    setIsVisible(true)

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed pointer-events-none z-[9999]"
      style={{
        left: position.x - (isHovering ? 15 : 10),
        top: position.y - (isHovering ? 15 : 10),
        width: isHovering ? 30 : 20,
        height: isHovering ? 30 : 20,
        borderRadius: '50%',
        border: isHovering ? '1.5px solid #a855f7' : '1px solid #38bdf8',
        background: isHovering ? 'rgba(168, 85, 247, 0.15)' : 'rgba(56, 189, 248, 0.1)',
        transition: 'transform 0.08s ease-out, width 0.15s, height 0.15s, border 0.15s, background 0.15s',
        transform: `scale(${isHovering ? 1.5 : 1})`,
        opacity: 0.3,
      }}
    />
  )
}
