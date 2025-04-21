import React, { Suspense, useMemo, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Text, Html, useProgress, Html as DreiHtml } from '@react-three/drei';
import { Monitor } from './Monitor';
import { Tower } from './Tower';
import { Keyboard } from './Keyboard';
import { Mouse } from './Mouse';
import { Desk } from './Desk';
import * as THREE from 'three';
import { FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';

interface SceneProps {
  children?: React.ReactNode;
  setActiveComponent: (name: string | null) => void;
}

// Simple social button component that shows label on hover
interface SocialButtonProps {
  position: [number, number, number];
  label: string;
  url: string;
  icon: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({ position, label, url, icon }) => {
  const [hovered, setHovered] = useState(false);
  
  const handleClick = () => {
    window.open(url, '_blank');
  };
  
  return (
    <group position={position}>
      {/* Icon instead of sphere */}
      <Html transform scale={0.15} position={[0, 0, 0]}>
        <div 
          onClick={handleClick}
          onMouseOver={() => setHovered(true)} 
          onMouseOut={() => setHovered(false)}
          style={{ 
            color: hovered ? '#ff3333' : '#ff0000',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            fontSize: '64px',
            position: 'relative',
            zIndex: 2
          }}
        >
          {icon}
          {hovered && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,0,0,0.4) 0%, rgba(255,0,0,0) 70%)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          )}
        </div>
      </Html>
      
      {/* Label shown on hover */}
      {hovered && (
        <Text
          position={[0, 0.25, 0]}
          fontSize={0.07}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

// Wire component to connect monitor to PC
const Wire = () => {
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(0, -0.7, -2.0), // Starting behind the monitor (further back)
      new THREE.Vector3(0.5, -0.8, -1.9), // Curving from behind the monitor
      new THREE.Vector3(1.0, -0.8, -1.7), // Along the desk
      new THREE.Vector3(2.0, -0.8, -1.6), // Along the desk
      new THREE.Vector3(2.4, -0.3, -1.5), // Up to the tower
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.015, 8, false);
  }, [curve]);

  return (
    <mesh>
      <primitive object={tubeGeometry} attach="geometry" />
      <meshStandardMaterial color="black" roughness={0.7} />
    </mesh>
  );
};

// Poster component to display the image on a flat plane
interface PosterProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}

const Poster: React.FC<PosterProps> = ({ position, rotation, scale = [1, 1, 1] }) => {
  const texture = useLoader(THREE.TextureLoader, 'https://pbs.twimg.com/media/GnDeBvWWUAAeK78.jpg:large');
  
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1.5]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.DoubleSide} 
        transparent={true}
        alphaTest={0.5}
      />
    </mesh>
  );
};

// Loading screen component
function LoadingScreen() {
  const { progress } = useProgress();
  return (
    <DreiHtml center>
      <div style={{ 
        color: '#ffffff', 
        fontSize: '1.5em',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        Loading... {progress.toFixed(0)}%
      </div>
    </DreiHtml>
  );
}

// Asset preloader component
function AssetPreloader() {
  const { scene } = useThree();
  
  // Preload the poster texture
  const posterTexture = useLoader(
    THREE.TextureLoader, 
    'https://pbs.twimg.com/media/GnDeBvWWUAAeK78.jpg:large'
  );
  
  // Preload monitor screen textures
  const monitorStaticImage = useLoader(
    THREE.TextureLoader,
    'https://orta.io/vscode-themes/images//8bit.png'
  );
  
  useEffect(() => {
    // Force textures to load and be available in the scene
    posterTexture.needsUpdate = true;
    monitorStaticImage.needsUpdate = true;
    
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const material = object.material;
        if (material instanceof THREE.Material) {
          material.needsUpdate = true;
        }
      }
    });
  }, [posterTexture, monitorStaticImage, scene]);
  
  return null;
}

// Make sure keyboard RGB is active immediately
function KeyboardRGBActivator() {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Force a re-render after a short delay to ensure all materials are loaded
    if (!initialized) {
      const timer = setTimeout(() => {
        setInitialized(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [initialized]);
  
  return null;
}

const Scene: React.FC<SceneProps> = ({ setActiveComponent }) => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0.64, 0, -1.89]} fov={45} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 2, 3]} intensity={0.3} />
      
      <Suspense fallback={<LoadingScreen />}>
        <AssetPreloader />
        <KeyboardRGBActivator />
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
            position={[2.5, -0.1, -1.5]} 
            scale={[0.5, 0.4, 0.5]}
            onPointerOver={() => setActiveComponent('Tower')}
            onPointerOut={() => setActiveComponent(null)}
          />
          <Keyboard 
            position={[0, -0.9, -0.8]} 
            scale={0.5}
            onPointerOver={() => setActiveComponent('Keyboard')}
            onPointerOut={() => setActiveComponent(null)}
            visible={true}
          />
          <Mouse 
            position={[1.5, -0.9, -0.8]} 
            scale={0.2}
            onPointerOver={() => setActiveComponent('Mouse')}
            onPointerOut={() => setActiveComponent(null)}
            visible={true}
          />
          
          {/* Wire connecting monitor to PC */}
          <Wire />
          
          {/* Perfect Timing Poster on the wall */}
          <Poster 
            position={[-1.5, 0.2, -2.2]} 
            rotation={[0, 0, 0]} 
            scale={[0.9, 0.9, 0.9]} 
          />
          
          {/* Social buttons positioned above the monitor */}
          <SocialButton 
            position={[-0.5, 0.55, -1.8]} 
            label="LinkedIn" 
            url="https://www.linkedin.com/in/aditya-tipre/"
            icon={<FaLinkedin />}
          />
          <SocialButton 
            position={[0, 0.55, -1.8]} 
            label="GitHub" 
            url="https://github.com/atipre"
            icon={<FaGithub />}
          />
          <SocialButton 
            position={[0.5, 0.55, -1.8]} 
            label="Resume" 
            url="/resume/resume.pdf"
            icon={<FaFileAlt />}
          />
          
          {/* Name on the wall */}
          <Text
            position={[-1.8, 1.8, -2.2]}
            rotation={[0, 0, 0]}
            fontSize={0.4}
            color="red"
            anchorX="left"
            anchorY="top"
            font={undefined}
            fontWeight="bold"
            material-toneMapped={false}
          >
            Aditya Tipre
          </Text>
          
          {/* Description below name */}
          <Text
            position={[-1.8, 1.25, -2.2]}
            rotation={[0, 0, 0]}
            fontSize={0.15}
            color="white"
            anchorX="left"
            anchorY="top"
            maxWidth={5}
            font={undefined}
            material-toneMapped={false}
          >
            Computer Engineering | Purdue '27 | Aspiring Software Engineer
          </Text>
        </group>
        <Environment preset="city" />
      </Suspense>

      <OrbitControls 
        enabled={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={4}
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

export default Scene;