import React, { useRef, useEffect } from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseProps extends GroupProps {
  scale?: number | [number, number, number];
}

const getRainbowColor = (offset: number) => {
  const time = Date.now() * 0.0008;
  const wave = Math.sin(offset + time) * 0.5 + 0.5;
  return new THREE.Color().setHSL(wave, 1, 0.5);
};

export const Mouse: React.FC<MouseProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  const rgbMaterials = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    rgbMaterials.current = Array.from({ length: 2 }, () => 
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.5,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0.5
      })
    );
  }, []);

  useFrame(() => {
    rgbMaterials.current.forEach((material, i) => {
      const color = getRainbowColor(i * 0.5);
      material.color = color;
      material.emissive = color;
    });
  });
  
  return (
    <group 
      ref={group} 
      {...props} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      dispose={null}
    >
      {/* Mouse Pad */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[3, 0.02, 2.4]} />
        <meshStandardMaterial color="#1e3a8a" side={THREE.DoubleSide} />
      </mesh>

      {/* Mouse Body */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[1, 0.4, 1.6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* RGB Side Strips */}
      <mesh castShadow position={[-0.51, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.3, 1.4]} />
        <meshStandardMaterial ref={(material) => {
          if (material) rgbMaterials.current[0] = material;
        }} />
      </mesh>
      
      <mesh castShadow position={[0.51, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.3, 1.4]} />
        <meshStandardMaterial ref={(material) => {
          if (material) rgbMaterials.current[1] = material;
        }} />
      </mesh>
      
      {/* Left Button */}
      <mesh castShadow position={[-0.25, 0.35, -0.4]}>
        <boxGeometry args={[0.5, 0.12, 0.6]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Right Button */}
      <mesh castShadow position={[0.25, 0.35, -0.4]}>
        <boxGeometry args={[0.5, 0.12, 0.6]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Scroll Wheel */}
      <mesh castShadow position={[0, 0.42, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.25, 12]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Mouse Cable */}
      <mesh position={[0, 0.35, 0.8]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
};