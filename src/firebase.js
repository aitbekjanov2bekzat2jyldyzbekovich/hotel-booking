import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP2AXgb3WDYeMTYHcDRLclYKeI75D3SVU",
  authDomain: "hotel-booking-42a79.firebaseapp.com",
  projectId: "hotel-booking-42a79",
  storageBucket: "hotel-booking-42a79.firebasestorage.app",
  messagingSenderId: "577415978446",
  appId: "1:577415978446:web:59e94a515e8d4c72515f9f",
  measurementId: "G-MB8JQ9TVVT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
