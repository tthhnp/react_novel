import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkqrsX0utexKCp04bVc7rNciOenejIQ1g",
  authDomain: "novel-app-ab.firebaseapp.com",
  projectId: "novel-app-ab",
  storageBucket: "novel-app-ab.firebasestorage.app",
  messagingSenderId: "782831827230",
  appId: "1:782831827230:web:9400511d6c07839554710f",
  measurementId: "G-D8DCSP4QD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure authentication settings
auth.useDeviceLanguage(); // Use the device's language for emails
auth.config.emulator = window.location.hostname === 'localhost'; // Enable emulator in development

export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export default app;