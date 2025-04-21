import React, { useRef, useEffect, useState, useMemo } from 'react';
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

// Pre-initialize materials outside component to ensure they exist immediately
const rgbMaterialsArray = Array.from({ length: 300 }, () => 
  new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.5
  })
);

export const Keyboard: React.FC<KeyboardProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  const rgbMaterials = useRef<THREE.MeshStandardMaterial[]>(rgbMaterialsArray);
  
  // Initialize colors immediately
  useEffect(() => {
    // Force immediate update of all materials
    rgbMaterials.current.forEach((material, i) => {
      const row = Math.floor(i / 30);
      const col = i % 30;
      const distance = Math.sqrt(Math.pow(col - 15, 2) + Math.pow(row - 5, 2)) * 0.2;
      const color = getRainbowColor(distance);
      material.color = color;
    });
  }, []);

  // Pre-generate key geometry
  const keyGeometry = useMemo(() => new THREE.BoxGeometry(0.09, 0.04, 0.09), []);
  
  // Create keys only once
  const keys = useMemo(() => {
    return Array.from({ length: 10 }).flatMap((_, row) =>
      Array.from({ length: 30 }).map((_, col) => {
        const position = [
          -1.8 + col * 0.12, 
          0.13, 
          -0.6 + row * 0.12
        ] as [number, number, number];
        
        return { position, index: row * 30 + col };
      })
    );
  }, []);

  // Update the colors every frame
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
      {keys.map(({ position, index }) => (
        <mesh
          key={`key-${index}`} 
          position={position} 
          castShadow
          geometry={keyGeometry}
        >
          <meshStandardMaterial ref={(material) => {
            if (material) {
              rgbMaterials.current[index] = material;
            }
          }} />
        </mesh>
      ))}
      
      {/* Status LEDs */}
      <mesh position={[1.5, 0.12, -0.5]}>
        <boxGeometry args={[0.05, 0.02, 0.05]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};