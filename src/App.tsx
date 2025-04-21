import React, { useRef, useState } from 'react';
import { GroupProps } from '@react-three/fiber';
import { Monitor } from './lib/components/3d/Monitor';
import Scene from './lib/components/3d/Scene';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 3D Rendering Area */}
      <div className="w-full h-screen">
        <Scene setActiveComponent={setActiveComponent}>
          <Monitor />
        </Scene>
      </div>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20" />
    </div>
  );
}

export default App