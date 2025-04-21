import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Monitor } from './Monitor';
import { Tower } from './Tower';
import { Keyboard } from './Keyboard';
import { Mouse } from './Mouse';
import { Desk } from './Desk';

interface SceneProps {
  children?: React.ReactNode;
  setActiveComponent: (name: string | null) => void;
}

const Scene: React.FC<SceneProps> = ({ setActiveComponent }) => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0.64, 0, -1.89]} fov={45} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 2, 3]} intensity={0.3} />
      
      <Suspense fallback={null}>
        <group position={[0, 0, 1]} rotation={[0, Math.PI, 0]}>
          <Desk 
            position={[0, -1, 0]} 
            scale={1}
          />
          <Monitor 
            position={[0, -0.9, -1.8]} 
            scale={0.5}
            onPointerOver={() => setActiveComponent('Monitor')}
            onPointerOut={() => setActiveComponent(null)}
          />
          <Tower 
            position={[2.5, 0.05, -1.5]} 
            scale={0.5}
            onPointerOver={() => setActiveComponent('Tower')}
            onPointerOut={() => setActiveComponent(null)}
          />
          <Keyboard 
            position={[0, -0.9, -0.8]} 
            scale={0.5}
            onPointerOver={() => setActiveComponent('Keyboard')}
            onPointerOut={() => setActiveComponent(null)}
          />
          <Mouse 
            position={[1.5, -0.9, -0.8]} 
            scale={0.2}
            onPointerOver={() => setActiveComponent('Mouse')}
            onPointerOut={() => setActiveComponent(null)}
          />
        </group>
        <Environment preset="city" />
      </Suspense>

      <OrbitControls 
        enabled={true}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={4}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
    </Canvas>
  );
};

export default Scene;