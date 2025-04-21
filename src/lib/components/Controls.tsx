import React, { useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

const Controls: React.FC = () => {
  const [activeControl, setActiveControl] = useState<string | null>(null);
  
  const controls = [
    { name: 'rotate', icon: <RotateCcw />, label: 'Rotate' },
    { name: 'zoom-in', icon: <ZoomIn />, label: 'Zoom In' },
    { name: 'zoom-out', icon: <ZoomOut />, label: 'Zoom Out' },
    { name: 'pan', icon: <Move />, label: 'Pan' },
  ];

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-4">
      {controls.map((control) => (
        <button
          key={control.name}
          className={`p-2 rounded-full transition-colors relative group ${
            activeControl === control.name ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
          onClick={() => setActiveControl(control.name === activeControl ? null : control.name)}
        >
          {control.icon}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {control.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Controls;