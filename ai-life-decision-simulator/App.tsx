import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import InputForm from './components/InputForm';
import RoadmapDisplay from './components/RoadmapDisplay';
import Logo from './components/Logo';
import { generateCareerPlan } from './services/geminiService';
import { StudentType, UserProfile, AIResponseData } from './types';

function App() {
  const [step, setStep] = useState<'welcome' | 'input' | 'loading' | 'results'>('welcome');
  const [studentType, setStudentType] = useState<StudentType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [resultData, setResultData] = useState<AIResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTypeSelection = (type: StudentType) => {
    setStudentType(type);
    setStep('input');
    setError(null);
  };

  const handleFormSubmit = async (profile: UserProfile) => {
    setUserProfile(profile);
    setStep('loading');
    setError(null);

    try {
      const data = await generateCareerPlan(profile);
      setResultData(data);
      setStep('results');
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate roadmap. Please check your network connection.");
      setStep('input');
    }
  };

  const handleReset = () => {
    setStep('welcome');
    setStudentType(null);
    setUserProfile(null);
    setResultData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-blue-500 selection:text-white">
      {step === 'welcome' && (
        <WelcomeScreen 
          onSelectType={handleTypeSelection} 
        />
      )}

      {step === 'input' && studentType && (
        <>
          {error && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-red-500/90 text-white px-6 py-4 rounded-xl shadow-2xl backdrop-blur flex items-center gap-3 animate-bounce-short">
              <span>⚠️</span> 
              <span>{error}</span>
            </div>
          )}
          <InputForm 
            studentType={studentType} 
            onSubmit={handleFormSubmit}
            onBack={() => setStep('welcome')}
          />
        </>
      )}

      {step === 'loading' && (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4 text-center">
           <Logo size="md" />
           <div className="relative">
             <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xs font-mono animate-pulse text-blue-400">AI</span>
             </div>
           </div>
           <div className="space-y-2">
             <p className="text-2xl text-white font-tech animate-pulse">Analyzing Profile...</p>
             <div className="text-slate-400 max-w-md mx-auto">
               <p>Crafting a unique path for <span className="text-blue-400 font-bold">{userProfile?.name}</span>.</p>
               <p className="text-sm mt-2">Searching Indian educational resources & exams...</p>
             </div>
           </div>
        </div>
      )}

      {step === 'results' && resultData && userProfile && (
        <RoadmapDisplay 
          data={resultData} 
          user={userProfile} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}

export default App;