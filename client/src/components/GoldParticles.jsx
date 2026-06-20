import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GoldParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    // Dimensions
    const width = currentRef.clientWidth;
    const height = currentRef.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);

    // Particles Geometry
    const particlesCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    const originalY = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // X coordinate (-4 to 4)
      positions[i] = (Math.random() - 0.5) * 10;
      // Y coordinate (-5 to 5)
      positions[i + 1] = (Math.random() - 0.5) * 10;
      // Z coordinate (-2 to 2)
      positions[i + 2] = (Math.random() - 0.5) * 5;

      speeds[i / 3] = 0.002 + Math.random() * 0.005;
      originalY[i / 3] = positions[i + 1];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Circular Gold Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(212, 175, 55, 1)'); // accent-gold solid
      gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      
      return new THREE.CanvasTexture(canvas);
    };

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.15,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Points
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positionsArr = geometry.attributes.position.array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        // Float upwards
        positionsArr[i3 + 1] += speeds[i];
        
        // Sway sideways (X-axis) using sine wave
        positionsArr[i3] += Math.sin(positionsArr[i3 + 1] + i) * 0.002;

        // Reset if particles go off screen top
        if (positionsArr[i3 + 1] > 5) {
          positionsArr[i3 + 1] = -5;
          positionsArr[i3] = (Math.random() - 0.5) * 10;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Slow overall rotation of the whole system
      particleSystem.rotation.y += 0.0005;
      particleSystem.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentRef) return;
      const w = currentRef.clientWidth;
      const h = currentRef.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-80"
    />
  );
};

export default GoldParticles;
