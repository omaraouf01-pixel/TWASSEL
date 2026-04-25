"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid, FiUsers, FiLayers, FiCheck, FiX,
  FiLogOut, FiShare2, FiEye, FiSearch, FiAlertTriangle, FiTrash2,
  FiShield, FiEdit2, FiPlus, FiUserCheck, FiUserX, FiKey, FiActivity
} from "react-icons/fi";
import { useRouter } from "next/navigation";

const INIT_PENDING = [
  { id: "p1", name: "Bilal H.",   matricule: "24CS-2201", email: "bilal.h@univ.edu",   faculty: "Science & Tech",       status: "pending", idCard: "bilal_id.jpg",   date: "2025-04-24" },
  { id: "p2", name: "Nour M.",    matricule: "24AR-1102", email: "nour.m@univ.edu",    faculty: "Architecture & Design", status: "pending", idCard: "nour_id.jpg",    date: "2025-04-23" },
  { id: "p3", name: "Rachid T.",  matricule: "24MA-0743", email: "rachid.t@univ.edu",  faculty: "Science & Tech",       status: "pending", idCard: "rachid_id.jpg",  date: "2025-04-22" },
  { id: "p4", name: "Fatima Z.",  matricule: "24BM-3310", email: "fatima.z@univ.edu",  faculty: "Business Management",  status: "pending", idCard: "fatima_id.jpg",  date: "2025-04-21" },
];

const INIT_STUDENTS = [
  { id: "s1", name: "Ahmed M.",   matricule: "23CS-1042", email: "ahmed.m@univ.edu",   faculty: "Science & Tech",       role: "student",  status: "active",    groups: 3, joined: "2025-01-15" },
  { id: "s2", name: "Sarah K.",   matricule: "23AR-0811", email: "sarah.k@univ.edu",   faculty: "Architecture & Design",role: "student",  status: "active",    groups: 2, joined: "2025-01-18" },
  { id: "s3", name: "Omar R.",    matricule: "23MA-0502", email: "omar.r@univ.edu",    faculty: "Science & Tech",       role: "leader",   status: "active",    groups: 1, joined: "2025-02-03" },
  { id: "s4", name: "Lina T.",    matricule: "23CS-1873", email: "lina.t@univ.edu",    faculty: "Science & Tech",       role: "leader",   status: "active",    groups: 4, joined: "2025-02-10" },
  { id: "s5", name: "Yasmine B.", matricule: "23BM-2290", email: "yasmine.b@univ.edu", faculty: "Business Management",  role: "student",  status: "suspended", groups: 2, joined: "2025-03-01" },
  { id: "s6", name: "Amira H.",   matricule: "23LT-0614", email: "amira.h@univ.edu",   faculty: "Humanities",           role: "student",  status: "active",    groups: 1, joined: "2025-03-15" },
];

const INIT_GROUPS = [
  { id: "cs-study-circle",  name: "CS Study Circle",        subject: "Computer Science",   leaderName: "Ahmed M.",   memberCount: 34, status: "active",  created: "2025-02-01" },
  { id: "arch-design",      name: "Architecture Design Hub", subject: "Architecture",       leaderName: "Sarah K.",   memberCount: 22, status: "active",  created: "2025-02-10" },
  { id: "math-physics",     name: "Math & Physics Hub",      subject: "Mathematics",        leaderName: "Omar R.",    memberCount: 18, status: "active",  created: "2025-02-20" },
  { id: "data-science-lab", name: "Data Science Lab",        subject: "Computer Science",   leaderName: "Lina T.",    memberCount: 41, status: "active",  created: "2025-03-05" },
  { id: "startup-lab",      name: "Startup & Innovation",    subject: "Business",           leaderName: "Yasmine B.", memberCount: 29, status: "pending", created: "2025-04-15" },
  { id: "lit-writing",      name: "Literature & Writing",    subject: "Literature",         leaderName: "Amira H.",   memberCount: 16, status: "active",  created: "2025-03-20" },
];

const ROLES = [
  { id: 1, name: "Student",       permissions: ["join_group", "post_hub", "share_resources", "send_messages"],                  color: "bg-slate-100 text-slate-600" },
  { id: 2, name: "Group Leader",  permissions: ["manage_group", "accept_members", "kick_members", "validate_resources"],        color: "bg-indigo-100 text-indigo-600" },
  { id: 3, name: "Moderator",     permissions: ["manage_group", "validate_groups", "warn_users", "moderate_content"],           color: "bg-amber-100 text-amber-600" },
  { id: 4, name: "Administrator", permissions: ["all_permissions"],                                                              color: "bg-rose-100 text-rose-600" },
];

function StudentFormModal({ isOpen, onClose, student, onSave }) {
  const [form, setForm] = useState(student || { name: "", matricule: "", email: "", faculty: "", role: "student" });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-5 bg-indigo-600 text-white flex justify-between items-center">
          <h2 className="text-sm font-bold">{student ? "Edit Student" : "Add New Student"}</h2>
          <button onClick={onClose} className="hover:opacity-70 cursor-pointer"><FiX size={18} /></button>
        </div>
        <div className="p-6 space-y-3">
          {[
            { key: "name",       placeholder: "Full Name" },
            { key: "matricule",  placeholder: "Matricule (e.g. 24CS-1042)" },
            { key: "email",      placeholder: "University Email", type: "email" },
            { key: "faculty",    placeholder: "Faculty" },
          ].map(({ key, placeholder, type = "text" }) => (
            <input
              key={key}
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
            />
          ))}
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500"
          >
            <option value="student">Student</option>
            <option value="leader">Group Leader</option>
            <option value="moderator">Moderator</option>
          </select>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase shadow-lg hover:bg-indigo-700 transition-all mt-2 cursor-pointer"
          >
            {student ? "Save Changes" : "Add Student"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function IdCardModal({ isOpen, onClose, studentName }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-800">Student ID — {studentName}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-full cursor-pointer"><FiX /></button>
        </div>
        <div className="p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 min-h-[160px]">
          <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-2xl font-black">
            {studentName?.[0]}
          </div>
          <p className="text-xs text-slate-400 font-semibold">ID card image preview</p>
          <p className="text-[10px] text-slate-300">(Backend integration required for real images)</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("stats");

  const [pendingStudents, setPendingStudents] = useState(INIT_PENDING);
  const [allStudents, setAllStudents] = useState(INIT_STUDENTS);
  const [allGroups, setAllGroups] = useState(INIT_GROUPS);

  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [idCardModal, setIdCardModal] = useState({ open: false, name: "" });
  const [studentSearch, setStudentSearch] = useState("");

  const approveStudent = (id) => setPendingStudents((p) => p.map((s) => s.id === id ? { ...s, status: "approved" } : s));
  const rejectStudent  = (id) => setPendingStudents((p) => p.map((s) => s.id === id ? { ...s, status: "rejected" } : s));
  const deleteStudent  = (id) => setAllStudents((p) => p.filter((s) => s.id !== id));
  const toggleSuspend  = (id) => setAllStudents((p) => p.map((s) => s.id === id ? { ...s, status: s.status === "active" ? "suspended" : "active" } : s));
  const approveGroup   = (id) => setAllGroups((p) => p.map((g) => g.id === id ? { ...g, status: "active" } : g));
  const deleteGroup    = (id) => setAllGroups((p) => p.filter((g) => g.id !== id));

  const saveStudent = (form) => {
    if (editingStudent) {
      setAllStudents((p) => p.map((s) => s.id === editingStudent.id ? { ...s, ...form } : s));
    } else {
      setAllStudents((p) => [...p, { ...form, id: `s${Date.now()}`, status: "active", groups: 0, joined: new Date().toISOString().slice(0, 10) }]);
    }
  };

  const activePending = pendingStudents.filter((s) => s.status === "pending");
  const pendingGroups = allGroups.filter((g) => g.status === "pending");
  const filteredStudents = allStudents.filter((s) =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.matricule.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const NAV = [
    { id: "stats",         label: "Overview",          icon: FiGrid },
    { id: "verifications", label: "Verifications",     icon: FiEye,          badge: activePending.length },
    { id: "students",      label: "Students",          icon: FiUsers },
    { id: "groups",        label: "Groups",            icon: FiLayers,       badge: pendingGroups.length },
    { id: "roles",         label: "Roles & Permissions",icon: FiShield },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans tracking-tight">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><FiShare2 size={18} /></div>
          <span className="text-lg font-black tracking-tighter">Twassel Admin</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <item.icon size={15} />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className={`ml-auto w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center ${activeTab === item.id ? "bg-white text-indigo-600" : "bg-red-500 text-white"}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => router.push("/auth")}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
          >
            <FiLogOut size={14} /> Exit System
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">System Dashboard</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Official Administrator Control Unit</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Admin Online</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >

            {/* ─── Overview ─── */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Students",  value: allStudents.length,                          icon: FiUsers,        color: "bg-blue-500" },
                    { label: "Active Groups",   value: allGroups.filter(g=>g.status==="active").length, icon: FiLayers,   color: "bg-indigo-500" },
                    { label: "Pending Verif.",  value: activePending.length,                         icon: FiActivity,    color: "bg-amber-500" },
                    { label: "Pending Groups",  value: pendingGroups.length,                         icon: FiAlertTriangle, color: "bg-rose-500" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform">
                      <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}><stat.icon size={18} /></div>
                      <div>
                        <p className="text-2xl font-black text-slate-800 leading-none">{stat.value}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-10 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center">
                  <FiActivity size={36} className="text-slate-200 mb-4" />
                  <p className="text-slate-300 font-bold text-xs uppercase tracking-[0.2em]">Live system traffic monitoring</p>
                  <p className="text-slate-200 text-[10px] mt-1">Real-time data requires backend integration</p>
                </div>
              </div>
            )}

            {/* ─── Verifications ─── */}
            {activeTab === "verifications" && (
              <div className="space-y-4">
                {activePending.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck size={28} className="text-green-500" />
                    </div>
                    <p className="text-slate-600 font-bold">All caught up!</p>
                    <p className="text-slate-400 text-sm">No pending verifications.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <AnimatePresence>
                      {activePending.map((student) => (
                        <motion.div
                          key={student.id}
                          layout
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4"
                        >
                          <button
                            onClick={() => setIdCardModal({ open: true, name: student.name })}
                            className="w-24 h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:border-indigo-300 hover:text-indigo-400 transition-colors shrink-0 cursor-pointer"
                          >
                            <FiEye size={20} />
                            <span className="text-[8px] font-black uppercase mt-2">View ID</span>
                          </button>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                              <p className="text-[9px] text-indigo-500 font-black uppercase tracking-tight mb-2">{student.faculty}</p>
                              <div className="text-[10px] font-bold text-slate-400 space-y-1">
                                <div className="flex justify-between">
                                  <span>Matricule:</span>
                                  <span className="text-slate-700">{student.matricule}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Email:</span>
                                  <span className="text-slate-700 truncate ml-2">{student.email}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Applied:</span>
                                  <span className="text-slate-500">{student.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-3">
                              <button
                                onClick={() => approveStudent(student.id)}
                                className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 transition-all cursor-pointer active:scale-95"
                              >
                                <FiCheck className="inline mr-1" size={11} />Approve
                              </button>
                              <button
                                onClick={() => rejectStudent(student.id)}
                                className="flex-1 bg-slate-50 text-slate-400 py-2 rounded-xl text-[10px] font-black uppercase hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                              >
                                <FiX className="inline mr-1" size={11} />Reject
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {pendingStudents.filter(s => s.status !== "pending").length > 0 && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recently Processed</p>
                    <div className="space-y-2">
                      {pendingStudents.filter(s => s.status !== "pending").map(s => (
                        <div key={s.id} className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3 opacity-60">
                          <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold text-xs">{s.name[0]}</div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-700">{s.name}</p>
                            <p className="text-[10px] text-slate-400">{s.matricule}</p>
                          </div>
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${s.status === "approved" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                            {s.status === "approved" ? <FiUserCheck size={10} /> : <FiUserX size={10} />}
                            {s.status === "approved" ? "Approved" : "Rejected"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── Students ─── */}
            {activeTab === "students" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      placeholder="Search by name or matricule…"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none focus:border-indigo-500 shadow-sm transition-all"
                    />
                  </div>
                  <button
                    onClick={() => { setEditingStudent(null); setShowStudentModal(true); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg hover:bg-indigo-700 transition-all cursor-pointer"
                  >
                    <FiPlus size={14} /> Add Student
                  </button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr className="text-slate-400 font-black uppercase tracking-widest text-[9px]">
                        <th className="px-5 py-4">Student</th>
                        <th className="px-5 py-4">Matricule</th>
                        <th className="px-5 py-4">Faculty</th>
                        <th className="px-5 py-4">Role</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3">
                            <p className="font-bold text-slate-800">{s.name}</p>
                            <p className="text-[9px] text-slate-400">{s.email}</p>
                          </td>
                          <td className="px-5 py-3 text-indigo-600 font-bold">{s.matricule}</td>
                          <td className="px-5 py-3 text-slate-500">{s.faculty}</td>
                          <td className="px-5 py-3">
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-indigo-50 text-indigo-600 capitalize">{s.role}</span>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${s.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => { setEditingStudent(s); setShowStudentModal(true); }}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <FiEdit2 size={13} />
                              </button>
                              <button
                                onClick={() => toggleSuspend(s.id)}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${s.status === "active" ? "text-amber-500 hover:bg-amber-50" : "text-emerald-500 hover:bg-emerald-50"}`}
                              >
                                {s.status === "active" ? <FiUserX size={13} /> : <FiUserCheck size={13} />}
                              </button>
                              <button
                                onClick={() => deleteStudent(s.id)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStudents.length === 0 && (
                    <p className="text-center text-slate-400 text-xs font-bold py-10">No students found.</p>
                  )}
                </div>
              </div>
            )}

            {/* ─── Groups ─── */}
            {activeTab === "groups" && (
              <div className="space-y-6">
                {pendingGroups.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FiAlertTriangle size={12} /> Awaiting Validation ({pendingGroups.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <AnimatePresence>
                        {pendingGroups.map((g) => (
                          <motion.div key={g.id} layout exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-amber-50 p-4 rounded-2xl border border-amber-100 space-y-3">
                            <h4 className="font-bold text-slate-800 text-sm">{g.name}</h4>
                            <p className="text-[9px] text-amber-600 font-bold uppercase">{g.subject} · by {g.leaderName}</p>
                            <div className="flex gap-2">
                              <button onClick={() => approveGroup(g.id)} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 transition-all cursor-pointer active:scale-95">
                                <FiCheck className="inline mr-1" size={10} />Approve
                              </button>
                              <button onClick={() => deleteGroup(g.id)} className="flex-1 py-2 bg-white text-red-500 border border-red-100 rounded-xl text-[10px] font-black uppercase hover:bg-red-50 transition-all cursor-pointer">
                                <FiX className="inline mr-1" size={10} />Reject
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Active Groups</h3>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr className="text-slate-400 font-black uppercase tracking-widest text-[9px]">
                          <th className="px-6 py-4">Group Name</th>
                          <th className="px-6 py-4">Leader</th>
                          <th className="px-6 py-4">Members</th>
                          <th className="px-6 py-4">Subject</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {allGroups.filter(g => g.status === "active").map((group) => (
                          <tr key={group.id} className="hover:bg-slate-50/60 transition-colors">
                            <td className="px-6 py-3 font-bold text-slate-800">{group.name}</td>
                            <td className="px-6 py-3 text-slate-500">{group.leaderName}</td>
                            <td className="px-6 py-3 text-slate-600 font-bold">{group.memberCount}</td>
                            <td className="px-6 py-3">
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-slate-100 text-slate-600">{group.subject}</span>
                            </td>
                            <td className="px-6 py-3 text-right">
                              <button
                                onClick={() => deleteGroup(group.id)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {allGroups.filter(g => g.status === "active").length === 0 && (
                      <p className="text-center text-slate-400 text-xs font-bold py-10">No active groups yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ─── Roles & Permissions ─── */}
            {activeTab === "roles" && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-500 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
                  Define what each role can do across the platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROLES.map((role) => (
                    <div key={role.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${role.color}`}><FiKey size={15} /></div>
                          <h3 className="font-black text-slate-800 text-sm">{role.name}</h3>
                        </div>
                        <button className="text-[9px] font-black text-slate-400 uppercase hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer">
                          <FiEdit2 size={11} /> Edit
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((perm) => (
                          <span key={perm} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-600 uppercase">
                            {perm.replace(/_/g, " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <StudentFormModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        student={editingStudent}
        onSave={saveStudent}
      />
      <IdCardModal
        isOpen={idCardModal.open}
        onClose={() => setIdCardModal({ open: false, name: "" })}
        studentName={idCardModal.name}
      />
    </div>
  );
}
