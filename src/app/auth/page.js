"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiShare2, FiUploadCloud, FiAlertCircle } from "react-icons/fi";

import { auth, db, storage } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AuthPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // حقول تسجيل الدخول
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // حقول إنشاء حساب
  const [regName, setRegName] = useState("");
  const [regMatricule, setRegMatricule] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regIdCard, setRegIdCard] = useState(null);

  // --- تسجيل الدخول ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const userDoc = await getDoc(doc(db, "users", credential.user.uid));

      if (!userDoc.exists()) { setError("Account not found."); setLoading(false); return; }

      const data = userDoc.data();
      if (data.role === "admin") return router.push("/admin");
      if (data.status === "pending") return router.push("/pending");
      if (data.status === "active") return router.push("/hub");
      if (data.status === "rejected") { setError("Your account was rejected."); auth.signOut(); }
    } catch (err) {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  // --- إنشاء حساب ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!regIdCard) { setError("Please upload your student ID card."); return; }
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const uid = credential.user.uid;

      // رفع صورة البطاقة
      const idRef = ref(storage, `idCards/${uid}`);
      await uploadBytes(idRef, regIdCard);
      const idCardUrl = await getDownloadURL(idRef);

      // حفظ بيانات الطالب في Firestore
      await setDoc(doc(db, "users", uid), {
        name: regName,
        matricule: regMatricule,
        email: regEmail,
        idCardUrl,
        role: "student",
        status: "pending",
        createdAt: serverTimestamp(),
      });

      router.push("/pending");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("This email is already registered.");
      else if (err.code === "auth/weak-password") setError("Password must be at least 6 characters.");
      else setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const heavySmoothTransition = { type: "tween", ease: [0.65, 0, 0.35, 1], duration: 0.7 };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans text-slate-800">

      {/* Desktop */}
      <div className="relative w-full max-w-5xl min-h-[680px] bg-white rounded-[2rem] shadow-xl overflow-hidden hidden md:flex">

        {/* Login */}
        <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-12 z-0">
          <form onSubmit={handleLogin} className="flex flex-col items-center w-full max-w-sm mx-auto gap-4">
            <h1 className="text-4xl font-black text-slate-800 mb-6 tracking-tight">Login to Twassel</h1>

            {error && !isSignIn === false && (
              <div className="w-full flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-4 py-3 rounded-xl">
                <FiAlertCircle size={14} /> {error}
              </div>
            )}

            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium" required />
            <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium mb-4" required />

            <button type="submit" disabled={loading}
              className="bg-indigo-500 text-white font-bold px-12 py-4 rounded-full hover:bg-indigo-600 transition-all active:scale-95 text-sm uppercase shadow-lg shadow-indigo-500/30 w-[220px] disabled:opacity-60">
              {loading ? "..." : "LOGIN"}
            </button>
          </form>
        </div>

        {/* Register */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-12 z-0 overflow-y-auto">
          <form onSubmit={handleRegister} className="flex flex-col items-center w-full max-w-sm mx-auto gap-3 py-8">
            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Create Account</h1>

            {error && isSignIn === false && (
              <div className="w-full flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-4 py-3 rounded-xl">
                <FiAlertCircle size={14} /> {error}
              </div>
            )}

            <input type="text" placeholder="Full Name" value={regName} onChange={(e) => setRegName(e.target.value)}
              className="w-full bg-slate-100 px-6 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium" required />
            <input type="text" placeholder="Matricule (e.g. 2026-CS-001)" value={regMatricule} onChange={(e) => setRegMatricule(e.target.value)}
              className="w-full bg-slate-100 px-6 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium" required />
            <input type="email" placeholder="University Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
              className="w-full bg-slate-100 px-6 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium" required />
            <input type="password" placeholder="Password (min. 6 chars)" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}
              className="w-full bg-slate-100 px-6 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium" required />

            <label className={`w-full flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer transition-all text-sm border border-dashed ${regIdCard ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "bg-slate-100 border-slate-300 text-slate-400 hover:bg-slate-200"}`}>
              <span className="truncate">{regIdCard ? regIdCard.name : "Upload Student ID Card"}</span>
              <FiUploadCloud size={22} className="text-indigo-500 shrink-0" />
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setRegIdCard(e.target.files[0] || null)} />
            </label>

            <button type="submit" disabled={loading}
              className="bg-indigo-500 text-white font-bold px-12 py-4 rounded-full hover:bg-indigo-600 transition-all active:scale-95 text-sm uppercase shadow-lg shadow-indigo-500/30 w-[220px] disabled:opacity-60 mt-2">
              {loading ? "Creating..." : "REGISTER"}
            </button>
          </form>
        </div>

        {/* Sliding Panel */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full bg-indigo-500 z-10 flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(0,0,0,0.15)]"
          animate={{ x: isSignIn ? "100%" : "0%" }}
          transition={heavySmoothTransition}
        >
          <AnimatePresence mode="wait">
            {isSignIn ? (
              <motion.div key="hello" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-12">
                <div className="flex items-center gap-3 mb-10 opacity-90"><FiShare2 size={28} /><span className="text-2xl font-semibold">Twassel</span></div>
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Hello, Student!</h2>
                <p className="text-indigo-100 text-base mb-12 max-w-[280px] leading-relaxed">Start your academic journey and connect with peers today.</p>
                <button onClick={() => { setIsSignIn(false); setError(""); }}
                  className="bg-transparent border-2 border-white text-white font-bold px-12 py-4 rounded-full hover:bg-white/10 transition-all text-sm uppercase w-[220px]">
                  REGISTER
                </button>
              </motion.div>
            ) : (
              <motion.div key="welcome" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-12">
                <div className="flex items-center gap-3 mb-10 opacity-90"><FiShare2 size={28} /><span className="text-2xl font-semibold">Twassel</span></div>
                <h2 className="text-5xl font-bold mb-6 tracking-tight">Welcome Back!</h2>
                <p className="text-indigo-100 text-base mb-12 max-w-[280px] leading-relaxed">Stay in the loop with your campus community.</p>
                <button onClick={() => { setIsSignIn(true); setError(""); }}
                  className="bg-transparent border-2 border-white text-white font-bold px-12 py-4 rounded-full hover:bg-white/10 transition-all text-sm uppercase w-[220px]">
                  LOGIN
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-500 p-4 rounded-2xl text-white shadow-lg shadow-indigo-500/30"><FiShare2 size={32} /></div>
        </div>
        <h2 className="text-3xl font-black text-center mb-6 text-slate-800 tracking-tight">
          {isSignIn ? "Login to Twassel" : "Create Account"}
        </h2>

        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-4 py-3 rounded-xl mb-4">
            <FiAlertCircle size={14} /> {error}
          </div>
        )}

        <form onSubmit={isSignIn ? handleLogin : handleRegister} className="flex flex-col gap-3">
          {!isSignIn && (
            <>
              <input type="text" placeholder="Full Name" value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
              <input type="text" placeholder="Matricule" value={regMatricule} onChange={(e) => setRegMatricule(e.target.value)} className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
              <input type="email" placeholder="University Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
              <input type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
              <label className={`w-full flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer text-sm border border-dashed ${regIdCard ? "bg-indigo-50 border-indigo-300 text-indigo-600" : "bg-slate-100 border-slate-300 text-slate-400"}`}>
                <span className="truncate">{regIdCard ? regIdCard.name : "Upload Student ID"}</span>
                <FiUploadCloud size={20} className="text-indigo-500 shrink-0" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setRegIdCard(e.target.files[0] || null)} />
              </label>
            </>
          )}
          {isSignIn && (
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />
          )}
          <input type="password" placeholder="Password" onChange={(e) => isSignIn ? setLoginPassword(e.target.value) : null}
            className="w-full bg-slate-100 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm" required />

          <button type="submit" disabled={loading}
            className="bg-indigo-500 text-white font-bold py-4 rounded-full hover:bg-indigo-600 transition-all text-sm uppercase shadow-lg shadow-indigo-500/30 mt-2 disabled:opacity-60">
            {loading ? "Please wait..." : isSignIn ? "LOGIN" : "REGISTER"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6 cursor-pointer hover:text-indigo-500 transition-colors font-medium"
          onClick={() => { setIsSignIn(!isSignIn); setError(""); }}>
          {isSignIn ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
