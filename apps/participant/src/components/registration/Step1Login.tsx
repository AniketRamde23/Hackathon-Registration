import React, { useState } from 'react';
import { LogIn, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

export const Step1Login = ({ onNext }: { onNext: () => void }) => {
  const { loginWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle(); 
      onNext();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!user) { onNext(); return; }
    try {
      setLoading(true);
      const token = await user.getIdToken(true);
      await api.post('/auth/sync', { uid: user.uid }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onNext();
    } catch (err) {
      console.error('Core Backend Sync Failed', err);
      onNext(); // Fallback bypass allowing Native to test
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
          <LogIn className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Authenticated!</h2>
        <p className="text-gray-400 mb-10 text-lg">Logged in securely as <span className="text-white font-medium">{user.email}</span></p>
        <button onClick={handleContinue} disabled={loading} className="w-full py-4 flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-purple-600 text-white font-bold hover:opacity-90 transition-opacity text-lg shadow-[0_0_20px_rgba(124,58,237,0.3)] disabled:opacity-50">
          {loading ? 'Syncing Secure Session...' : 'Continue to Registration'}
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Welcome to HackFlow</h2>
        <p className="text-gray-400 text-lg">Sign in dynamically to generate your application token</p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto">
        <button 
          onClick={handleGoogleLogin} 
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          {loading ? 'Performing handshake...' : 'Continue with Google'}
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-gray-600 text-sm font-bold tracking-widest uppercase">Or</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button 
          onClick={onNext}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[rgba(124,58,237,0.2)] border border-[#7C3AED] text-[#22D3EE] font-black tracking-widest uppercase hover:bg-[rgba(124,58,237,0.4)] transition-colors shadow-[0_0_20px_rgba(124,58,237,0.2)]"
        >
          <Smartphone className="w-5 h-5" />
          Bypass Auth (Sandbox Mode)
        </button>
      </div>
    </div>
  );
};
