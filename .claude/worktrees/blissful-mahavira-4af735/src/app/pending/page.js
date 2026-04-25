"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiClock, FiCheck, FiShield, FiLogOut } from "react-icons/fi";

export default function PendingApprovalPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[500px] bg-white rounded-[40px] shadow-2xl p-10 flex flex-col items-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>

        {/* Timeline Stepper */}
        <div className="w-full flex items-center justify-between relative mb-12 mt-4 px-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full"></div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 z-0 rounded-full"
          ></motion.div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-200"
            >
              <FiCheck size={20} />
            </motion.div>
            <span className="text-[11px] font-bold text-slate-700 absolute -bottom-6 whitespace-nowrap">Registered</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <motion.div
              animate={{ boxShadow: ["0px 0px 0px 0px rgba(99, 102, 241, 0.4)", "0px 0px 0px 10px rgba(99, 102, 241, 0)"] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-10 h-10 rounded-full bg-white border-4 border-indigo-500 text-indigo-500 flex items-center justify-center"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                <FiClock size={16} />
              </motion.div>
            </motion.div>
            <span className="text-[11px] font-bold text-indigo-600 absolute -bottom-6 whitespace-nowrap">Reviewing</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white text-slate-400 flex items-center justify-center">
              <FiShield size={18} />
            </div>
            <span className="text-[11px] font-bold text-slate-400 absolute -bottom-6 whitespace-nowrap">Approved</span>
          </div>
        </div>

        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 mt-4">
          <FiClock className="text-indigo-500 text-5xl" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-3">Account under review</h1>
        <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed px-4">
          Welcome to <span className="font-bold text-indigo-500">Twassel</span>! Your account has been created successfully.
          Our team is currently verifying your university ID card. We will notify you once you have full access.
        </p>

        <button
          onClick={() => router.push("/auth")}
          className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all text-sm font-bold cursor-pointer border border-slate-200"
        >
          <FiLogOut />
          <span>Log out for now</span>
        </button>

      </motion.div>
    </main>
  );
}
