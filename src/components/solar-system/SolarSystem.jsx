import { useEffect, useRef, useState, useCallback } from 'react'

// Planet data with exact specifications from the prompt
const PLANETS = [
  { name: 'Merkurius', size: 7.6, colors: ['#8C8C8C', '#A0A0A0'], orbitRadius: 60, orbitDuration: 20, rotationDuration: 40, direction: 1 },
  { name: 'Venus', size: 19, colors: ['#E6B800', '#D4A017'], orbitRadius: 90, orbitDuration: 35, rotationDuration: 60, direction: -1 },
  { name: 'Bumi', size: 20, colors: ['#1E88E5', '#43A047', '#E6D5B8'], orbitRadius: 130, orbitDuration: 50, rotationDuration: 20, direction: 1, isEarth: true },
  { name: 'Mars', size: 10.6, colors: ['#C1440E', '#E27B58'], orbitRadius: 170, orbitDuration: 75, rotationDuration: 42, direction: 1 },
  { name: 'Yupiter', size: 50, colors: ['#C19A6B', '#E8D5A3', '#8B6F47', '#D4A76A'], orbitRadius: 250, orbitDuration: 120, rotationDuration: 10, direction: 1, isJupiter: true },
  { name: 'Saturnus', size: 42, colors: ['#E8DCC8', '#C4B9A3'], orbitRadius: 340, orbitDuration: 180, rotationDuration: 12, direction: 1, isSaturn: true },
  { name: 'Uranus', size: 32, colors: ['#7DE3F4', '#5FBED0'], orbitRadius: 420, orbitDuration: 240, rotationDuration: 18, direction: -1 },
  { name: 'Neptunus', size: 30, colors: ['#2E5C8A', '#3B6EA5'], orbitRadius: 500, orbitDuration: 300, rotationDuration: 16, direction: 1 },
]

// Sun component
function Sun() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full"
      style={{
        width: 48,
        height: 48,
        background: 'linear-gradient(135deg, #FDB813, #F57C00, #E65100)',
        boxShadow: '0 0 60px rgba(255, 165, 0, 0.6), 0 0 120px rgba(255, 165, 0, 0.3)',
        animation: 'pulseGlow 3s ease-in-out infinite',
      }}
    />
  )
}

// Individual Planet component
function Planet({ planet, fastMode }) {
  const { name, size, colors, orbitRadius, orbitDuration, rotationDuration, direction, isEarth, isSaturn, isJupiter } = planet
  const orbitRef = useRef(null)
  const planetRef = useRef(null)
  const animationRef = useRef(null)
  const rotationRef = useRef(0)
  const orbitRotationRef = useRef(Math.random() * 360) // Random start position

  useEffect(() => {
    let lastTime = performance.now()
    const speedMultiplier = fastMode ? 5 : 1

    const animate = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000
      lastTime = currentTime

      orbitRotationRef.current += (360 / (orbitDuration / speedMultiplier)) * delta
      rotationRef.current += (360 / (rotationDuration / speedMultiplier)) * delta * direction

      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate(-50%, -50%) rotate(${orbitRotationRef.current}deg)`
      }
      if (planetRef.current) {
        planetRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [orbitDuration, rotationDuration, direction, fastMode])

  const planetStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
    transformOrigin: 'center center',
  }

  // Build gradient based on planet type
  let background
  if (isEarth) {
    background = `radial-gradient(circle at 30% 30%, ${colors[0]} 0%, ${colors[1]} 60%, ${colors[2]} 100%)`
  } else if (isJupiter) {
    background = `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 25%, ${colors[2]} 50%, ${colors[3]} 75%, ${colors[0]} 100%)`
  } else {
    background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`
  }

  return (
    <div
      ref={orbitRef}
      className="orbit-ring"
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
      }}
    >
      <div style={planetStyle} ref={planetRef}>
        {/* Planet body */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background,
            boxShadow: name === 'Matahari' ? 'none' : `0 0 ${size / 3}px ${colors[0]}40`,
            position: 'relative',
            overflow: isEarth ? 'hidden' : 'visible',
          }}
        >
          {/* Earth special: night side + city lights + satellite */}
          {isEarth && <EarthDetails size={size} />}

          {/* Saturn special: rings */}
          {isSaturn && <SaturnRing size={size} />}

          {/* Jupiter special: Great Red Spot */}
          {isJupiter && (
            <div
              style={{
                position: 'absolute',
                width: size * 0.15,
                height: size * 0.1,
                background: '#B7410E',
                borderRadius: '50%',
                top: '40%',
                left: '30%',
                opacity: 0.8,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Earth details: night overlay, city lights, satellite
function EarthDetails({ size }) {
  const satelliteContainerRef = useRef(null)
  const satelliteAngle = useRef(0)
  const animRef = useRef(null)

  useEffect(() => {
    const animate = () => {
      satelliteAngle.current += 2 // fast orbit
      if (satelliteContainerRef.current) {
        satelliteContainerRef.current.style.transform = `rotate(${satelliteAngle.current}deg)`
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Random city lights positions
  const cityLights = Array.from({ length: 7 }, (_, i) => ({
    id: i,
    top: 20 + Math.random() * 60,
    left: 10 + Math.random() * 35, // only on left side (night side)
    size: 1 + Math.random() * 0.5,
  }))

  return (
    <>
      {/* Night side overlay */}
      <div
        className="earth-night-overlay"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 50%)',
        }}
      />
      {/* City lights */}
      {cityLights.map((light) => (
        <div
          key={light.id}
          className="city-lights"
          style={{
            width: light.size,
            height: light.size,
            top: `${light.top}%`,
            left: `${light.left}%`,
          }}
        />
      ))}
      {/* Satellite */}
      <div
        ref={satelliteContainerRef}
        style={{
          position: 'absolute',
          inset: -15,
          animation: 'satelliteOrbit 5s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 3,
            height: 3,
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 4px rgba(255,255,255,0.8)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </>
  )
}

// Saturn Ring component
function SaturnRing({ size }) {
  return (
    <>
      {/* Outer ring */}
      <div
        className="saturn-ring"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          top: '50%',
          left: '50%',
          marginTop: -size * 0.9,
          marginLeft: -size * 0.9,
          borderWidth: 1,
          borderColor: '#D4C5A9',
          opacity: 0.5,
        }}
      />
      {/* Inner ring */}
      <div
        className="saturn-ring"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          top: '50%',
          left: '50%',
          marginTop: -size * 0.75,
          marginLeft: -size * 0.75,
          borderWidth: 1,
          borderColor: '#C4B595',
          opacity: 0.4,
        }}
      />
    </>
  )
}

// Asteroid Belt
function AsteroidBelt({ size }) {
  const asteroids = Array.from({ length: 80 }, (_, i) => {
    const angle = (i / 80) * 360 + (Math.random() - 0.5) * 4
    const radius = 210 + (Math.random() - 0.5) * 40
    const asteroidSize = 1 + Math.random()
    return { id: i, angle, radius, size: asteroidSize }
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: size,
        height: size,
        animation: 'asteroidDrift 300s linear infinite',
        pointerEvents: 'none',
      }}
    >
      {asteroids.map((a) => {
        const x = Math.cos((a.angle * Math.PI) / 180) * a.radius + size / 2
        const y = Math.sin((a.angle * Math.PI) / 180) * a.radius + size / 2
        return (
          <div
            key={a.id}
            style={{
              position: 'absolute',
              width: a.size,
              height: a.size,
              background: '#666',
              borderRadius: '50%',
              left: x,
              top: y,
            }}
          />
        )
      })}
    </div>
  )
}

// Comet component
function Comet() {
  const [comets, setComets] = useState([])

  useEffect(() => {
    const spawnComet = () => {
      const id = Date.now()
      const startY = -20 + Math.random() * 10
      setComets((prev) => [...prev, { id, startY }])
      setTimeout(() => {
        setComets((prev) => prev.filter((c) => c.id !== id))
      }, 15000)
    }

    // Initial comet
    const initialTimeout = setTimeout(spawnComet, 3000)
    // Random interval between 15-25 seconds
    const interval = setInterval(() => {
      spawnComet()
    }, 15000 + Math.random() * 10000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {comets.map((comet) => (
        <div
          key={comet.id}
          className="comet"
          style={{
            top: `${comet.startY}%`,
            left: '-20%',
            zIndex: 5,
          }}
        >
          <div className="comet-head" />
          <div className="comet-tail" />
        </div>
      ))}
    </>
  )
}

// Meteor Shower
function MeteorShower() {
  const [meteors, setMeteors] = useState([])

  useEffect(() => {
    const spawnMeteor = () => {
      const id = Date.now() + Math.random()
      const left = 30 + Math.random() * 70
      const delay = Math.random() * 5
      setMeteors((prev) => [...prev.slice(-4), { id, left, delay }])
      setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== id))
      }, 2500)
    }

    // Spawn meteors periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.3) spawnMeteor()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            left: `${meteor.left}%`,
            top: '-10%',
            animationDelay: `${meteor.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </>
  )
}

// Nebula Glow
function NebulaGlow({ size }) {
  const nebulas = [
    { id: 1, top: '10%', left: '5%', color: '#a855f7', opacity: 0.08, scale: 1 },
    { id: 2, top: '70%', left: '80%', color: '#38bdf8', opacity: 0.06, scale: 0.8 },
    { id: 3, top: '80%', left: '10%', color: '#a855f7', opacity: 0.05, scale: 1.2 },
    { id: 4, top: '20%', left: '85%', color: '#38bdf8', opacity: 0.07, scale: 0.9 },
  ]

  return (
    <>
      {nebulas.map((n) => (
        <div
          key={n.id}
          className="nebula-glow"
          style={{
            width: size * 0.5,
            height: size * 0.5,
            top: n.top,
            left: n.left,
            background: `radial-gradient(circle, ${n.color} 0%, transparent 70%)`,
            opacity: n.opacity,
            transform: `scale(${n.scale})`,
          }}
        />
      ))}
    </>
  )
}

// Star Field
function StarField({ size }) {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.2 + Math.random() * 0.8,
    twinkleDelay: Math.random() * 5,
    twinkleDuration: 2 + Math.random() * 3,
  }))

  return (
    <div
      style={{
        position: 'absolute',
        inset: -20,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: 'white',
            borderRadius: '50%',
            opacity: star.opacity,
            animation: `starTwinkle ${star.twinkleDuration}s ease-in-out infinite`,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Main Solar System Component
export default function SolarSystem({
  size = 400,
  opacity = 1,
  interactive = true,
  showDetails = true,
  scrollPhase = 'hero',
}) {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [fastMode, setFastMode] = useState(false)
  const clickCount = useRef(0)
  const clickTimeout = useRef(null)

  // Mouse tilt effect
  useEffect(() => {
    if (!interactive || !containerRef.current) return

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rotateY = ((e.clientX - centerX) / 20)
      const rotateX = -((e.clientY - centerY) / 20)
      setTilt({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    const el = containerRef.current
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [interactive])

  // Touch tilt effect
  useEffect(() => {
    if (!interactive || !containerRef.current) return

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotateY = ((touch.clientX - centerX) / 20)
        const rotateX = -((touch.clientY - centerY) / 20)
        setTilt({ x: rotateX, y: rotateY })
      }
    }

    const handleTouchEnd = () => {
      setTilt({ x: 0, y: 0 })
    }

    const el = containerRef.current
    el.addEventListener('touchmove', handleTouchMove, { passive: true })
    el.addEventListener('touchend', handleTouchEnd)

    return () => {
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [interactive])

  // Easter egg: triple click
  const handleClick = useCallback(() => {
    clickCount.current += 1
    if (clickCount.current === 3) {
      setFastMode(true)
      setTimeout(() => setFastMode(false), 3000)
      clickCount.current = 0
      if (clickTimeout.current) clearTimeout(clickTimeout.current)
    }
    if (clickTimeout.current) clearTimeout(clickTimeout.current)
    clickTimeout.current = setTimeout(() => {
      clickCount.current = 0
    }, 5000)
  }, [])

  return (
    <div
      ref={containerRef}
      className="solar-system-container relative"
      style={{
        width: size,
        height: size,
        opacity,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        cursor: interactive ? 'pointer' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      onClick={handleClick}
      role="img"
      aria-label="Tata surya 3D interaktif dengan 8 planet"
    >
      {/* Star Field Background */}
      {showDetails && <StarField size={size} />}

      {/* Nebula Glow */}
      {showDetails && <NebulaGlow size={size} />}

      {/* Asteroid Belt */}
      {showDetails && <AsteroidBelt size={size} />}

      {/* Sun */}
      <Sun />

      {/* Planets */}
      {PLANETS.map((planet) => (
        <Planet key={planet.name} planet={planet} fastMode={fastMode} />
      ))}

      {/* Comet */}
      {showDetails && <Comet />}

      {/* Meteor Shower */}
      {showDetails && <MeteorShower />}
    </div>
  )
}
