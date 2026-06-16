import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MeshWave() {
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
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
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
            float elevation = sin(modelPosition.x * 0.5 + uTime) * 0.3 +
                             sin(modelPosition.y * 0.5 + uTime * 0.5) * 0.3 +
                             sin(modelPosition.x * 0.3 + modelPosition.y * 0.3 + uTime * 0.7) * 0.2;
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
            float mixStrength = (vElevation + 0.5) * 0.5;
            vec3 color = mix(uColor1, uColor2, mixStrength);
            color = mix(color, uColor3, sin(vUv.x * 3.14159 + uTime) * 0.2 + 0.2);
            gl_FragColor = vec4(color, 0.25);
          }
        `}
        transparent
      />
    </mesh>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00D9A5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const offset = i * 2;
        child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + offset) * 0.5 + 2;
        child.position.x = Math.cos(state.clock.elapsedTime * 0.3 + offset) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-3, 1, -5]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#00D9A5" transparent opacity={0.5} />
      </mesh>
      <mesh position={[3, 2, -3]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 3, -4]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#2DD4BF" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-2, 0.5, -2]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshBasicMaterial color="#00D9A5" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D9A5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#38BDF8" />
        <MeshWave />
        <Particles />
        <FloatingOrbs />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/30 to-dark-900 pointer-events-none" />
    </div>
  );
}
