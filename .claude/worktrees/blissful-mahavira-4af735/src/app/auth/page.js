"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiShare2, FiUploadCloud, FiUser, FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});

  const [registerForm, setRegisterForm] = useState({ username: "", email: "", password: "", idCard: null });
  const [registerErrors, setRegisterErrors] = useState({});

  function validateLogin() {
    const errors = {};
    if (!loginForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) errors.email = "Invalid email";
    if (!loginForm.password) errors.password = "Password is required";
    return errors;
  }

  function validateRegister() {
    const errors = {};
    if (!registerForm.username.trim()) errors.username = "Username is required";
    if (!registerForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) errors.email = "Invalid email";
    if (!registerForm.password) errors.password = "Password is required";
    else if (registerForm.password.length < 6) errors.password = "At least 6 characters";
    if (!registerForm.idCard) errors.idCard = "ID card is required";
    return errors;
  }

  function handleLogin(e) {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) { setLoginErrors(errors); return; }
    setLoginErrors({});
    router.push("/hub");
  }

  function handleRegister(e) {
    e.preventDefault();
    const errors = validateRegister();
    if (Object.keys(errors).length > 0) { setRegisterErrors(errors); return; }
    setRegisterErrors({});
    router.push("/pending");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="relative w-full max-w-[900px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row md:h-[620px]">

        {/* ================= Overlay ================= */}
        <motion.div
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 45, damping: 20, mass: 1.2 }}
          className="hidden md:flex absolute top-0 left-0 w-1/2 h-full bg-indigo-500 z-50 flex-col items-center justify-center text-white p-12 text-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <FiShare2 size={30} />
            <h1 className="text-2xl font-bold tracking-widest">Twassel</h1>
          </div>

          <motion.h2
            key={isLogin ? "hello" : "welcome"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            {isLogin ? "Hello, Student!" : "Welcome Back!"}
          </motion.h2>

          <motion.p
            key={isLogin ? "journey" : "loop"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 text-sm"
          >
            {isLogin
              ? "Start your academic journey and connect with peers today."
              : "Welcome back! Stay in the loop with your campus community."}
          </motion.p>

          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setLoginErrors({}); setRegisterErrors({}); }}
            className="px-14 py-3 border-2 border-white rounded-full font-bold text-xs hover:bg-white hover:text-indigo-500 transition-all cursor-pointer active:scale-95"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </motion.div>

        {/* ================= Mobile Tab Switch ================= */}
        <div className="md:hidden flex border-b border-slate-100">
          <button
            onClick={() => { setIsLogin(true); setLoginErrors({}); }}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${isLogin ? "text-indigo-600 border-b-2 border-indigo-500" : "text-slate-400"}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setRegisterErrors({}); }}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLogin ? "text-indigo-600 border-b-2 border-indigo-500" : "text-slate-400"}`}
          >
            Register
          </button>
        </div>

        {/* ================= Login Form ================= */}
        <div className={`w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8 md:p-12 ${!isLogin ? "hidden md:flex" : "flex"}`}>
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Login to Twassel</h2>
          <form onSubmit={handleLogin} className="w-full space-y-4" noValidate>

            <div>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className={`w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm ${loginErrors.email ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-indigo-500"}`}
                />
              </div>
              {loginErrors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{loginErrors.email}</p>}
            </div>

            <div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className={`w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm ${loginErrors.password ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-indigo-500"}`}
                />
              </div>
              {loginErrors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{loginErrors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all active:scale-95 cursor-pointer mt-2"
            >
              Login
            </button>
          </form>
        </div>

        {/* ================= Register Form ================= */}
        <div className={`w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8 md:p-12 ${isLogin ? "hidden md:flex" : "flex"}`}>
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Create Account</h2>
          <form onSubmit={handleRegister} className="w-full space-y-4" noValidate>

            <div>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Username"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  className={`w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm ${registerErrors.username ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-indigo-500"}`}
                />
              </div>
              {registerErrors.username && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{registerErrors.username}</p>}
            </div>

            <div>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className={`w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm ${registerErrors.email ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-indigo-500"}`}
                />
              </div>
              {registerErrors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{registerErrors.email}</p>}
            </div>

            <div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className={`w-full p-4 pl-12 bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm ${registerErrors.password ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-indigo-500"}`}
                />
              </div>
              {registerErrors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{registerErrors.password}</p>}
            </div>

            <div>
              <label className={`flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${registerErrors.idCard ? "border-red-400 bg-red-50" : "border-indigo-200 hover:bg-indigo-50"}`}>
                <FiUploadCloud className="text-indigo-500" size={20} />
                <span className="text-sm font-bold text-indigo-500">
                  {registerForm.idCard ? registerForm.idCard.name : "Upload ID Card"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => setRegisterForm({ ...registerForm, idCard: e.target.files[0] || null })}
                />
              </label>
              {registerErrors.idCard && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{registerErrors.idCard}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all active:scale-95 cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
