"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiAlertCircle, FiShare2 } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans tracking-tight">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {/* 🎨 Logo & Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative">
            <FiAlertCircle size={48} className="text-rose-500" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <FiShare2 size={16}/>
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tighter uppercase">Twassel.</span>
          </div>
        </div>

        {/* 📝 Error Message */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">404</h1>
          <h2 className="text-xl font-bold text-slate-800">Lost in Campus?</h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed px-8">
            The page you are looking for doesn't exist or has been moved to another faculty.
          </p>
        </div>

        {/* 🔘 Action Button */}
        <div className="pt-4">
          <Link href="/hub">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
              Back to Safety (Hub)
            </motion.button>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest pt-8">
          Official Error Unit • Twassel System 2026
        </p>
      </motion.div>
    </div>
  );
}