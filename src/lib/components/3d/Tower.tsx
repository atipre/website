import React, { useRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

interface TowerProps extends GroupProps {
  scale?: number | [number, number, number];
}

export const Tower: React.FC<TowerProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group 
      ref={group} 
      {...props}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      dispose={null}
    >
      {/* Main Case */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2, 4, 1.5]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Front Panel */}
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.02, 3.9, 1.4]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* CD Drive Bays */}
      <group position={[-1.01, 1.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.15, 1.4]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.02, 0, 0.65]}>
          <boxGeometry args={[0.02, 0.13, 0.1]} />
          <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      
      <group position={[-1.01, 1.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.15, 1.4]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.02, 0, 0.65]}>
          <boxGeometry args={[0.02, 0.13, 0.1]} />
          <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      
      {/* Power Button */}
      <mesh position={[-1.01, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Power LED */}
      <mesh position={[-1.01, 0.8, 0.3]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>
      
      {/* Bottom Power Button */}
      <mesh position={[-1.01, -1.3, -0.5]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.02]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
      
      {/* CD Drive Slot */}
      <mesh position={[-1.01, -1.3, 0]} castShadow>
        <boxGeometry args={[0.02, 0.02, 0.8]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Tower Stand */}
      <mesh position={[0, -2.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.2, 1.7]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
};