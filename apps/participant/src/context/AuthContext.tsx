'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOut as firebaseSignOut } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ uid: firebaseUser.uid })
          });
          
          if (res.ok) {
            const data = await res.json();
            setRole(data.user.role);
            
            // Store JWT in httpOnly cookie via Next.js API route
            await fetch('/api/auth/cookie', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: data.jwt })
            });

            setUser(firebaseUser);
          } else {
             await firebaseSignOut(auth);
             setUser(null);
             setRole(null);
          }
        } catch (error) {
           console.error('Failed to sync user', error);
           setUser(null);
        }
      } else {
        setUser(null);
        setRole(null);
        await fetch('/api/auth/cookie', { method: 'DELETE' });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithGoogle();
  };

  const logout = async () => {
    await firebaseSignOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      loading,
      isAuthenticated: !!user,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
