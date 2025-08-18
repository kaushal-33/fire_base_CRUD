import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBOJk2gSLP6CME4yliFUzlZrqVaPRFZgoM",
    authDomain: "radheshyam-electronics.firebaseapp.com",
    projectId: "radheshyam-electronics",
    storageBucket: "radheshyam-electronics.firebasestorage.app",
    messagingSenderId: "839836015590",
    appId: "1:839836015590:web:9f22479c90a480e26ed427"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

