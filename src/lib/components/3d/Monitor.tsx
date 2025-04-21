import React, { useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { GroupProps, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface MonitorProps extends GroupProps {
  scale?: number | [number, number, number];
}

export const Monitor: React.FC<MonitorProps> = ({ scale = 1, ...props }) => {
  const group = useRef<THREE.Group>(null);
  
  // Load static image texture for left side of screen
  const staticImageTexture = useLoader(
    THREE.TextureLoader, 
    'https://orta.io/vscode-themes/images//8bit.png'
  );
  
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
        
        {/* Left Screen Display - Static Image */}
        <mesh position={[-0.7, 0, 0.06]}>
          <planeGeometry args={[1.4, 1.8]} />
          <meshBasicMaterial map={staticImageTexture} />
        </mesh>
        
        {/* Right Screen Display - GIF */}
        <mesh position={[0.7, 0, 0.06]}>
          <planeGeometry args={[1.4, 1.8]} />
          <meshBasicMaterial color="#000000" />
          <Html 
            transform
            scale={0.1}
            position={[0, 0, 0.01]}
            rotation={[0, 0, 0]}
            zIndexRange={[0, 0]}
          >
            <div style={{ 
              width: '560px', 
              height: '720px', 
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <img 
                src="https://media3.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif?cid=6c09b952ejh1ogujpjntmg50l3ukzm04ucwcaq4mdbawz1sr&ep=v1_gifs_search&rid=giphy.gif&ct=g" 
                alt="Code animation" 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </Html>
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