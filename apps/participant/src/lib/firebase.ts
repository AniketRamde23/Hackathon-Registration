import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, PhoneAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, signOut as fbSignOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize Firebase securely (avoiding re-initialization in Next.js dev mode)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { PhoneAuthProvider };

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export const sendOTP = async (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const verifyOTP = async (confirmationResult: any, code: string) => {
  return confirmationResult.confirm(code);
};

export const signOut = async () => {
  return fbSignOut(auth);
};
