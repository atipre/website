import React, { useRef, useEffect } from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KeyboardProps extends GroupProps {
  scale?: number | [number, number, number];
}

const getRainbowColor = (offset: number) => {
  const time = Date.now() * 0.0008;
  const wave = Math.sin(offset + time) * 0.5 + 0.5;
  const hue = wave;
  return new THREE.Color().setHSL(hue, 1, 0.5);
};

export const Keyboard: React.FC<KeyboardProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  const rgbMaterials = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    rgbMaterials.current = Array.from({ length: 300 }, () => 
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.5
      })
    );
  }, []);

  useFrame(() => {
    rgbMaterials.current.forEach((material, i) => {
      const row = Math.floor(i / 30);
      const col = i % 30;
      const distance = Math.sqrt(Math.pow(col - 15, 2) + Math.pow(row - 5, 2)) * 0.2;
      const color = getRainbowColor(distance);
      material.color = color;
    });
  });
  
  return (
    <group 
      ref={group} 
      {...props} 
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
      dispose={null}
    >
      {/* Keyboard Base */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[4, 0.1, 1.5]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* Key Area */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[3.8, 0.05, 1.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Generate Keys */}
      {Array.from({ length: 10 }).map((_, row) => (
        Array.from({ length: 30 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`} 
            position={[
              -1.8 + col * 0.12, 
              0.13, 
              -0.6 + row * 0.12
            ]} 
            castShadow>
            <boxGeometry args={[0.09, 0.04, 0.09]} />
            <meshStandardMaterial ref={(material) => {
              if (material) {
                rgbMaterials.current[row * 30 + col] = material;
              }
            }} />
          </mesh>
        ))
      ))}
      
      {/* Status LEDs */}
      <mesh position={[1.5, 0.12, -0.5]}>
        <boxGeometry args={[0.05, 0.02, 0.05]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};