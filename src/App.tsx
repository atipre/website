import React, { useRef, useState } from 'react';
import { GroupProps } from '@react-three/fiber';
import { Monitor } from './lib/components/3d/Monitor';
import Scene from './lib/components/3d/Scene';
import Controls from './lib/components/Controls';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 3D Rendering Area */}
      <div className="w-full h-screen">
        <Scene setActiveComponent={setActiveComponent}>
          <Monitor />
        </Scene>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Controls />
      </div>

      {/* Component Info */}
      <AnimatePresence>
        {activeComponent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs"
          >
            <h3 className="text-lg font-bold text-blue-400">{activeComponent}</h3>
            <p className="text-sm text-gray-300 mt-1">
              {activeComponent === 'Monitor' && 'LCD Display with wide viewing angles and crisp resolution.'}
              {activeComponent === 'Tower' && 'Desktop PC with powerful components and excellent cooling.'}
              {activeComponent === 'Keyboard' && 'Mechanical keyboard with tactile feedback and programmable keys.'}
              {activeComponent === 'Mouse' && 'Ergonomic gaming mouse with precision tracking.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Button */}
      <button 
        className="absolute top-4 right-4 p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => setShowInfo(!showInfo)}
      >
        <Info size={24} />
      </button>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
            onClick={() => setShowInfo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 p-6 rounded-xl max-w-md m-4"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-4">3D Computer Model</h2>
              <p className="mb-3">This is an interactive 3D model of a desktop computer setup. You can:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Rotate the view by dragging</li>
                <li>Zoom in/out using the scroll wheel</li>
                <li>Pan by holding Shift while dragging</li>
                <li>Click on components to get more information</li>
              </ul>
              <button 
                className="w-full py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setShowInfo(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20" />
    </div>
  );
}

export default App