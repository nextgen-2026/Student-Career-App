import React, { useState } from 'react';
import Logo from './Logo';
import { StudentType, UserProfile } from '../types';

interface InputFormProps {
  studentType: StudentType;
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ studentType, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    gradeOrYear: '',
    interests: '',
    goal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type: studentType
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            ← Back
          </button>
          <Logo size="sm" />
          <div className="w-10" /> {/* Spacer */}
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 text-center">Design Your Future</h2>
        <p className="text-center text-slate-400 mb-8">
          Tell AI about yourself to generate the perfect roadmap.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input
              required
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {studentType === StudentType.SCHOOL ? 'Current Grade/Class' : 'Current Year & Degree'}
            </label>
            <input
              required
              name="gradeOrYear"
              type="text"
              value={formData.gradeOrYear}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder={studentType === StudentType.SCHOOL ? "e.g. 10th Standard (CBSE)" : "e.g. 2nd Year B.Tech CSE"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Skills & Interests</label>
            <textarea
              required
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Coding, Mathematics, Public Speaking, Cricket"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ultimate Career Goal</label>
            <input
              required
              name="goal"
              type="text"
              value={formData.goal}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. AI Engineer at Google, IAS Officer, Doctor"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg text-lg hover:from-blue-500 hover:to-purple-500 shadow-lg transform transition-all active:scale-95"
          >
            Generate My Roadmap 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;