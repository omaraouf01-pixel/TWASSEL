"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiInfo, FiX, FiSend, FiFileText } from "react-icons/fi";

export default function JoinRequestModal({ groupName, isOpen, onClose }) {
  const [answer, setAnswer] = useState("");
  const [isSent, setIsSent] = useState(false);

  // دالة لمحاكاة إرسال الطلب
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    // بعد ثانيتين يتم إغلاق النافذة تلقائياً
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative"
          >
            
            {/* النجاح بعد الإرسال */}
            <AnimatePresence>
              {isSent && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <FiCheckCircle size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Request Sent!</h3>
                  <p className="text-sm text-slate-400 mt-2 font-medium">The group leader will review your answers soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Join {groupName}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Application Form</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              
              {/* 📜 Group Rules (Read-Only) */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-500">
                  <FiInfo size={16} />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Group Rules</h4>
                </div>
                <ul className="bg-slate-50 p-5 rounded-2xl space-y-2 border border-slate-100">
                  <li className="text-xs text-slate-500 font-medium flex gap-2">
                    <span className="text-indigo-500">•</span> No off-topic discussions or spam.
                  </li>
                  <li className="text-xs text-slate-500 font-medium flex gap-2">
                    <span className="text-indigo-500">•</span> Respect all members and share resources.
                  </li>
                  <li className="text-xs text-slate-500 font-medium flex gap-2">
                    <span className="text-indigo-500">•</span> Active participation is required.
                  </li>
                </ul>
              </section>

              {/* ✍️ Leader's Questions */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-500">
                  <FiFileText size={16} />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Leader's Question</h4>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-700">What is your current level and why do you want to join this circle?</p>
                  <textarea 
                    required
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-28 resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-600 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    Submit Request <FiSend />
                  </button>
                </div>
              </form>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}