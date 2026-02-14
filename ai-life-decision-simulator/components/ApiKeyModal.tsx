import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [inputKey, setInputKey] = useState('');

  const handleSave = () => {
    if (inputKey.trim().length > 10) {
      localStorage.setItem('gemini_api_key', inputKey.trim());
      onSave();
    } else {
      alert("Please enter a valid API Key");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-slate-900 border-2 border-blue-500 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(59,130,246,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        
        <h2 className="text-2xl font-bold text-white mb-4 font-tech">🔑 Setup API Key</h2>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">
          To use the AI simulator, you need a Google API Key.
          <br/>
          <span className="text-slate-500 text-xs">This key is stored locally on your device.</span>
          <br/><br/>
          <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-yellow-400 hover:text-yellow-300 underline font-semibold">👉 Click here to get a free key</a>
        </p>

        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Paste key here (starts with AIza...)"
          className="w-full bg-slate-950 border border-slate-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4 font-mono text-sm"
          autoFocus
        />

        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/25"
        >
          Save & Start App
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;