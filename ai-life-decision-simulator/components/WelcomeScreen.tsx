import React from 'react';
import Logo from './Logo';
import { StudentType } from '../types';

interface WelcomeScreenProps {
  onSelectType: (type: StudentType) => void;
  onOpenSettings: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectType, onOpenSettings }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-12">
      
      {/* Settings Button */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 hover:border-slate-500"
        >
          <span>🔑</span> Update API Key
        </button>
      </div>

      <Logo size="lg" />
      
      <div className="space-y-4 max-w-md w-full">
        <p className="text-slate-300 text-lg mb-8">Select your current academic stage to begin your personalized journey.</p>
        
        <button
          onClick={() => onSelectType(StudentType.SCHOOL)}
          className="group relative w-full p-6 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-2xl font-bold text-white mb-2">School Student</h3>
          <p className="text-slate-400 text-sm">Class 1 to 12 • Exploring Paths</p>
        </button>

        <button
          onClick={() => onSelectType(StudentType.COLLEGE)}
          className="group relative w-full p-6 rounded-xl bg-slate-800 border border-slate-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-red-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-2xl font-bold text-white mb-2">College Student</h3>
          <p className="text-slate-400 text-sm">Undergrad & Postgrad • Career Focus</p>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;