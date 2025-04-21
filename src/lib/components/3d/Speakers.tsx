import React, { useRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

interface SpeakersProps extends GroupProps {
  scale?: number | [number, number, number];
}

export const Speakers: React.FC<SpeakersProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group 
      ref={group} 
      {...props} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      dispose={null}
    >
      {/* Left Speaker */}
      <group position={[-1.2, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Speaker Driver */}
        <group position={[0, 0, 0.41]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.28, 0.15, 0.1, 32]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
        
        {/* Tweeter */}
        <mesh position={[0, 0.6, 0.41]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
      
      {/* Right Speaker */}
      <group position={[1.2, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.8, 2, 0.8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Speaker Driver */}
        <group position={[0, 0, 0.41]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.28, 0.15, 0.1, 32]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
        
        {/* Tweeter */}
        <mesh position={[0, 0.6, 0.41]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Volume Control */}
        <mesh position={[0, -0.8, 0.41]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
        
        {/* Power LED */}
        <mesh position={[0, -0.6, 0.41]}>
          <boxGeometry args={[0.05, 0.05, 0.01]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1} />
        </mesh>
      </group>
    </group>
  );
};