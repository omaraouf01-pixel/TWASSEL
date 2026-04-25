import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// إعدادات مشروع Twassel الخاصة بك
const firebaseConfig = {
  apiKey: "AIzaSyC7GwIhSxMn8sjMdaegiuQUYmETF2TJJ4g",
  authDomain: "twassel-23c4d.firebaseapp.com",
  projectId: "twassel-23c4d",
  storageBucket: "twassel-23c4d.firebasestorage.app",
  messagingSenderId: "757731656307",
  appId: "1:757731656307:web:127fef6310d82b2adf2006",
  measurementId: "G-VVK4JPRZV7"
};

// تهيئة Firebase بطريقة آمنة تمنع التكرار في Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// تصدير الخدمات لكي نستخدمها في باقي صفحات المشروع
export const db = getFirestore(app);      // قاعدة البيانات (Firestore)
export const auth = getAuth(app);         // نظام تسجيل الدخول (Authentication)
export const storage = getStorage(app);   // مساحة تخزين الملفات والصور (Storage)