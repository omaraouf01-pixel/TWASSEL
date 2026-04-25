"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiBook, FiAward, FiCamera, FiCheck, FiArrowRight, FiTarget } from "react-icons/fi";

const INTERESTS = ['Programming', 'Design', 'Science', 'Sports', 'Art', 'AI', 'Math', 'Music', 'Literature', 'Business'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [academic, setAcademic] = useState({ faculty: "", major: "" });

  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [selectedInterests, setSelectedInterests] = useState([]);

  function nextStep() {
    setStep(step + 1);
  }

  function toggleInterest(tag) {
    setSelectedInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-[600px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative p-10">

        {/* Timeline Stepper */}
        <div className="w-full flex items-center justify-between relative mb-10 px-6">
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full"></div>
          <motion.div
            animate={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 z-0 rounded-full"
          ></motion.div>

          {[
            { num: 1, icon: FiBook, label: "Academic" },
            { num: 2, icon: FiUser, label: "Persona" },
            { num: 3, icon: FiAward, label: "Finish" },
          ].map(({ num, icon: Icon, label }) => (
            <div key={num} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                animate={step === num ? { boxShadow: ["0px 0px 0px 0px rgba(99, 102, 241, 0.4)", "0px 0px 0px 8px rgba(99, 102, 241, 0)"] } : {}}
                transition={{ repeat: step === num ? Infinity : 0, duration: 1.5 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  step > num ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' :
                  step === num ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' :
                  'bg-white border-4 border-indigo-200 text-indigo-300'
                }`}
              >
                {step > num ? <FiCheck size={18} /> : <Icon size={18} />}
              </motion.div>
              <span className={`text-[11px] font-bold absolute -bottom-6 whitespace-nowrap ${step >= num ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold mb-6"
          >
            <FiCheck />
            <span>Congratulations! Your account is approved.</span>
          </motion.div>

          <AnimatePresence mode="wait">

            {/* Step 1: Academic Identity */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <h2 className="text-3xl font-bold text-slate-800">Academic Identity</h2>
                <p className="text-slate-500 text-sm">Tell us about your studies at the university.</p>

                <div className="space-y-3 text-left px-2">
                  <div>
                    <div className="group relative">
                      <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Faculty (e.g. Science & Tech)"
                        value={academic.faculty}
                        onChange={(e) => setAcademic({ ...academic, faculty: e.target.value })}
                        className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                      />
                  </div>

                  <div className="group relative">
                    <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type="text"
                      placeholder="Major / Speciality"
                      value={academic.major}
                      onChange={(e) => setAcademic({ ...academic, major: e.target.value })}
                      className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                    />
                  </div>
                </div>

                <button onClick={nextStep} className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 cursor-pointer mt-4">
                  Continue <FiArrowRight />
                </button>
              </motion.div>
            )}

            {/* Step 2: Persona */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800">Your Persona</h2>
                <div className="relative w-28 h-28 mx-auto mt-4">
                  <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    {avatar
                      ? <img src={URL.createObjectURL(avatar)} alt="avatar" className="w-full h-full object-cover" />
                      : <FiUser size={40} className="text-slate-300" />
                    }
                  </div>
                  <label className="absolute bottom-0 right-0 p-3 bg-indigo-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                    <FiCamera size={16} />
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setAvatar(e.target.files[0] || null)} />
                  </label>
                </div>
                <div className="text-left px-2">
                  <label className="text-xs font-bold text-slate-400 ml-2 mb-2 block">Short Bio</label>
                  <textarea
                    placeholder="Tell your peers something about you..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 h-28 resize-none text-sm transition-all"
                  ></textarea>
                </div>
                <button onClick={nextStep} className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 cursor-pointer">
                  Almost there <FiArrowRight />
                </button>
              </motion.div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                  <FiAward size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">You're All Set!</h2>
                <p className="text-slate-500 text-sm px-4">Pick some interests and enter the world of Twassel.</p>

                <div className="flex flex-wrap justify-center gap-2 py-4 px-2">
                  {INTERESTS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleInterest(tag)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                        selectedInterests.includes(tag)
                          ? "bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-100"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                {selectedInterests.length > 0 && (
                  <p className="text-xs text-indigo-500 font-medium">{selectedInterests.length} interest{selectedInterests.length > 1 ? "s" : ""} selected</p>
                )}

                <button
                  onClick={() => router.push("/hub")}
                  className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-green-100 hover:bg-green-600 transition-all active:scale-95 cursor-pointer mt-2"
                >
                  Start My Journey 🚀
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
