import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function BrowCurve({ position, color }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.12
    }
  })

  return (
    <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.3, 0.16, 24, 120, Math.PI * 1.65]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
    </mesh>
  )
}

function ExperienceSection() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glow backdrop-blur-md">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Visual 3D</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Experiência imersiva com 3D e interação.</h2>
          <p className="max-w-xl text-slate-300">Um ambiente 3D simples mostra como a marca pode ganhar movimento e estilo, sem depender apenas de imagens estáticas.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 text-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Look</p>
              <p className="mt-3 text-lg font-semibold text-white">Forma fluida</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 text-slate-200">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Interação</p>
              <p className="mt-3 text-lg font-semibold text-white">Rotação suave</p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl">
          <Canvas className="h-[24rem] rounded-[1.75rem] bg-slate-950" camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight color="#f472b6" intensity={1.2} position={[5, 5, 5]} />
            <directionalLight color="#38bdf8" intensity={0.6} position={[-5, 3, -5]} />
            <BrowCurve position={[-1.25, 0, 0]} color="#f472b6" />
            <BrowCurve position={[1.25, 0, 0]} color="#f59e0b" />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
