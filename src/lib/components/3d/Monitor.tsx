import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MonitorProps extends GroupProps {
  scale?: number | [number, number, number];
}

export const Monitor: React.FC<MonitorProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  
  // Simple monitor model created using primitive shapes
  return (
    <group 
      ref={group} 
      {...props} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      dispose={null}
    >
      {/* Monitor Screen */}
      <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
        
        {/* Screen Display */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshStandardMaterial color="#0a9396" emissive="#0a9396" emissiveIntensity={0.2} />
        </mesh>
      </mesh>
      
      {/* Monitor Stand - Neck */}
      <mesh castShadow receiveShadow position={[0, 0.4, -0.05]}>
        <boxGeometry args={[0.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor Stand - Base */}
      <mesh castShadow receiveShadow position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};