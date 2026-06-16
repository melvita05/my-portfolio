import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Layer 1: Ocean waves mesh
function OceanWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#050816') },
      uColor2: { value: new THREE.Color('#00D9A5') },
      uColor3: { value: new THREE.Color('#38BDF8') },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 100, 100]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            float wave1 = sin(modelPosition.x * 0.4 + uTime * 0.8) * 0.3;
            float wave2 = sin(modelPosition.y * 0.3 + uTime * 0.6) * 0.4;
            float wave3 = sin(modelPosition.x * 0.2 + modelPosition.y * 0.3 + uTime) * 0.25;

            float elevation = wave1 + wave2 + wave3;
            modelPosition.z += elevation;
            vElevation = elevation;

            gl_Position = projectionMatrix * viewMatrix * modelPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixStrength = (vElevation + 1.0) * 0.35;
            vec3 color = mix(uColor1, uColor2, mixStrength);
            color = mix(color, uColor3, sin(vUv.x * 6.28 + uTime * 0.5) * 0.15 + 0.15);

            float alpha = 0.15 + mixStrength * 0.1;
            gl_FragColor = vec4(color, alpha);
          }
        `}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// Layer 2: Floating light spheres
function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  const spheres = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        -8 - Math.random() * 8,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      color: i % 3 === 0 ? '#00D9A5' : i % 3 === 1 ? '#38BDF8' : '#2DD4BF',
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const sphere = spheres[i];
        const t = state.clock.elapsedTime * sphere.speed + sphere.phase;
        child.position.y = sphere.position[1] + Math.sin(t) * 1.5;
        child.position.x = sphere.position[0] + Math.cos(t * 0.7) * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={sphere.position}>
          <sphereGeometry args={[sphere.scale, 32, 32]} />
          <meshBasicMaterial
            color={sphere.color}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// Layer 3: Technology network lines
function NetworkLines() {
  const linesRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const positions: [number, number, number][] = [
      [-4, 2, -5],
      [4, 2, -5],
      [0, 3, -6],
      [-3, -1, -4],
      [3, -1, -4],
      [0, 0, -7],
      [-2, 1, -5],
      [2, 1, -5],
    ];

    return positions.map((pos, i) => ({
      position: pos,
      connections: i < 5 ? [i + 1, i + 2] : [],
      color: i % 2 === 0 ? '#00D9A5' : '#38BDF8',
    }));
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={linesRef}>
      {nodes.map((node, i) => (
        <group key={i}>
          <mesh position={node.position}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Layer 4: Mouse-reactive particles
function MouseParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { gl } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / gl.domElement.clientWidth) * 2 - 1,
        y: -(e.clientY / gl.domElement.clientHeight) * 2 + 1,
      });
    };
    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [gl]);

  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        positions[idx] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
        positions[idx + 1] += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.002;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.z = mousePos.x * 0.05;
      pointsRef.current.rotation.x = mousePos.y * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00D9A5"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Main background component
interface DynamicBackgroundProps {
  variant?: 'default' | 'skills' | 'experience' | 'projects' | 'contact';
}

export default function DynamicBackground({ variant = 'default' }: DynamicBackgroundProps) {
  const lightIntensity = variant === 'contact' ? 0.3 : variant === 'projects' ? 0.8 : 0.5;
  const particleOpacity = variant === 'contact' ? 0.3 : 0.5;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={lightIntensity} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00D9A5" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#38BDF8" />

        <OceanWaves />
        <FloatingSpheres />
        <NetworkLines />
        <MouseParticles />
      </Canvas>

      {/* Layer 5: Parallax gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-transparent to-dark-900/50 pointer-events-none" />

      {/* Section-specific overlays */}
      {variant === 'skills' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-cyan-500/5 pointer-events-none animate-pulse-slow" />
      )}
      {variant === 'experience' && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-transparent to-dark-900/60 pointer-events-none" />
      )}
      {variant === 'projects' && (
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-primary-500/5 pointer-events-none" />
      )}
    </div>
  );
}
