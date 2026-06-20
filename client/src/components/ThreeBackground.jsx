import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

const FloatingGeometries = () => {
  const knotRef = useRef();
  const sphere1Ref = useRef();
  const sphere2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Slow rotation for the Torus Knot
    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.05;
      knotRef.current.rotation.y = time * 0.08;
      knotRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }

    // Floating and wobble for smaller spheres
    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = Math.sin(time * 0.7) * 0.25 - 1.5;
      sphere1Ref.current.position.x = Math.cos(time * 0.4) * 0.15 - 2;
    }

    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = Math.cos(time * 0.6) * 0.2 + 1.8;
      sphere2Ref.current.position.x = Math.sin(time * 0.5) * 0.2 + 2.2;
    }
  });

  return (
    <>
      {/* Central Majestic Torus Knot */}
      <mesh ref={knotRef} position={[1.2, 0, -0.5]} scale={[0.85, 0.85, 0.85]}>
        <torusKnotGeometry args={[1, 0.35, 120, 16]} />
        <meshStandardMaterial
          color="#EED07B" // warm metallic gold
          roughness={0.12}
          metalness={0.95}
        />
      </mesh>

      {/* Floating sphere 1 (Bottom Left) */}
      <mesh ref={sphere1Ref} position={[-2, -1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.9}
          distort={0.2}
          speed={1.5}
        />
      </mesh>

      {/* Floating sphere 2 (Top Right) */}
      <mesh ref={sphere2Ref} position={[2.2, 1.8, -1]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#FCFCFA" // pearl white sphere
          roughness={0.08}
          metalness={0.3}
        />
      </mesh>
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        {/* Lights */}
        <ambientLight intensity={1.8} />
        
        {/* Gold Directional Lighting to create high-contrast shiny reflections */}
        <directionalLight 
          position={[6, 6, 4]} 
          intensity={3.0} 
          color="#E6C665" 
          castShadow
        />
        
        {/* Fill lighting from opposite side */}
        <directionalLight 
          position={[-6, -6, 2]} 
          intensity={1.2} 
          color="#FFFFFF" 
        />
        
        {/* Subtle top ambient bounce */}
        <pointLight position={[0, 4, 2]} intensity={1.5} color="#FCFCFA" />

        {/* Floating elements inside a Drei Float wrapper for gentle default sway */}
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <FloatingGeometries />
        </Float>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
