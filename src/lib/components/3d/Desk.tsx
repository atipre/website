import React, { useRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

interface DeskProps extends GroupProps {
  scale?: number | [number, number, number];
}

export const Desk: React.FC<DeskProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  
  return (
    <group 
      ref={group} 
      {...props} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      dispose={null}
    >
      {/* Desk Top */}
      <mesh castShadow receiveShadow position={[0, 0, -1]}>
        <boxGeometry args={[10, 0.2, 3.5]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      
      {/* Left Leg */}
      <mesh castShadow receiveShadow position={[-4.6, -1.5, -1]}>
        <boxGeometry args={[0.4, 3, 0.4]} />
        <meshStandardMaterial color="#1f1f1f" />
      </mesh>
      
      {/* Right Leg */}
      <mesh castShadow receiveShadow position={[4.6, -1.5, -1]}>
        <boxGeometry args={[0.4, 3, 0.4]} />
        <meshStandardMaterial color="#1f1f1f" />
      </mesh>
    </group>
  );
};