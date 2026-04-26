"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiTrendingUp, FiUsers, FiCheck, FiX,
  FiCompass, FiStar, FiLock
} from "react-icons/fi";
import Sidebar from "@/components/Sidebar";

const GROUPS = [
  {
    id: "cs-study-circle",
    name: "CS Study Circle",
    category: "Computer Science",
    description: "A collaborative space for CS students to tackle algorithms, share code reviews, and prepare for exams together.",
    members: 34,
    maxMembers: 50,
    trending: true,
    isNew: false,
    tags: ["Algorithms", "Data Structures", "OOP"],
    gradient: "from-indigo-500 to-purple-600",
    leader: "Ahmed M.",
    rules: "1. Treat everyone with respect\n2. No off-topic conversations\n3. Share resources generously\n4. No plagiarism or cheating assistance",
    questions: [
      "What semester are you currently in?",
      "Which programming language do you primarily use?",
      "What topic are you struggling with the most right now?",
    ],
    joined: false,
  },
  {
    id: "arch-design",
    name: "Architecture Design Hub",
    category: "Architecture",
    description: "From hand sketches to 3D renders — share your designs, get honest feedback, and grow together.",
    members: 22,
    maxMembers: 30,
    trending: false,
    isNew: false,
    tags: ["3D Modeling", "Rendering", "AutoCAD"],
    gradient: "from-pink-500 to-rose-600",
    leader: "Sarah K.",
    rules: "1. Constructive feedback only — be kind\n2. Respect intellectual property\n3. Use proper file naming conventions",
    questions: [
      "Which design software are you most comfortable with?",
      "What year of Architecture are you currently in?",
    ],
    joined: true,
  },
  {
    id: "math-physics",
    name: "Math & Physics Hub",
    category: "Mathematics",
    description: "Weekly problem-solving sessions, exam prep, and concept discussions for Math and Physics students.",
    members: 18,
    maxMembers: 40,
    trending: true,
    isNew: false,
    tags: ["Calculus", "Linear Algebra", "Mechanics"],
    gradient: "from-blue-500 to-cyan-600",
    leader: "Omar R.",
    rules: "1. Show your full work when asking for help\n2. Be patient with beginners\n3. Check pinned resources before asking duplicate questions",
    questions: [
      "What math or physics courses are you currently taking?",
      "What's your biggest challenge in the subject right now?",
    ],
    joined: false,
  },
  {
    id: "data-science-lab",
    name: "Data Science Lab",
    category: "Computer Science",
    description: "Hands-on data science projects using Python, Pandas, and ML frameworks — from raw data to real insights.",
    members: 41,
    maxMembers: 45,
    trending: true,
    isNew: true,
    tags: ["Python", "ML", "Pandas"],
    gradient: "from-emerald-500 to-teal-600",
    leader: "Lina T.",
    rules: "1. Document your Jupyter notebooks properly\n2. Use Git for version control on all projects\n3. No data sharing outside the group\n4. Weekly contributions are encouraged",
    questions: [
      "What's your experience level with Python? (Beginner / Intermediate / Advanced)",
      "Which ML frameworks have you used before?",
      "What kind of data project are you most interested in?",
    ],
    joined: false,
  },
  {
    id: "startup-lab",
    name: "Startup & Innovation",
    category: "Business",
    description: "Turn your ideas into real projects. Discuss entrepreneurship, build MVPs, and find co-founders on campus.",
    members: 29,
    maxMembers: 60,
    trending: false,
    isNew: true,
    tags: ["Entrepreneurship", "MVP", "Pitching"],
    gradient: "from-amber-500 to-orange-600",
    leader: "Yasmine B.",
    rules: "1. Respect all ideas — no idea is too small\n2. Confidentiality — don't share members' ideas outside\n3. Active monthly participation required",
    questions: [
      "Do you have a startup idea you're working on?",
      "What's your background? (Tech / Business / Design / Other)",
    ],
    joined: false,
  },
  {
    id: "lit-writing",
    name: "Literature & Writing",
    category: "Literature",
    description: "Poetry, short stories, critical essays — share your writing and improve through thoughtful peer feedback.",
    members: 16,
    maxMembers: 25,
    trending: false,
    isNew: false,
    tags: ["Creative Writing", "Poetry", "Essays"],
    gradient: "from-violet-500 to-purple-700",
    leader: "Amira H.",
    rules: "1. Feedback must be constructive and kind\n2. Original work only — no plagiarism\n3. Weekly contributions are encouraged",
    questions: [
      "What kind of writing do you enjoy most?",
      "Share a 2–3 sentence sample of your writing style.",
    ],
    joined: false,
  },
];

function JoinModal({ group, onClose, onJoin }) {
  const [step, setStep] = useState("rules");
  const [answers, setAnswers] = useState(group.questions.map(() => ""));
  const canSubmit = answers.every((a) => a.trim().length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-[28px] w-full max-w-[480px] overflow-hidden shadow-2xl"
      >
        {/* Group banner */}
        <div className={`h-28 bg-gradient-to-br ${group.gradient} p-5 flex items-end justify-between relative`}>
          <div>
            <h2 className="text-lg font-black text-white leading-tight">{group.name}</h2>
            <p className="text-white/75 text-xs mt-0.5">{group.members} members · Led by {group.leader}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "rules" && (
              <motion.div key="rules" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}>
                <div className="flex items-center gap-2 mb-4">
                  <FiLock size={15} className="text-slate-500" />
                  <h3 className="font-bold text-slate-800 text-sm">Group Rules</h3>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 mb-6 border border-slate-100">
                  {group.rules.split("\n").map((rule, i) => (
                    <div key={i} className="flex gap-3 text-sm text-slate-600">
                      <span className="text-indigo-400 font-black flex-shrink-0 text-xs mt-0.5">{i + 1}</span>
                      <span className="leading-relaxed">{rule.replace(/^\d+\.\s*/, "")}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 text-center mb-4">By continuing, you agree to follow these rules.</p>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep("questions")}
                    className="flex-1 py-3 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 cursor-pointer transition-all active:scale-95"
                  >
                    I Agree →
                  </button>
                </div>
              </motion.div>
            )}

            {step === "questions" && (
              <motion.div key="questions" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}>
                <h3 className="font-bold text-slate-800 text-sm mb-0.5">Answer a few questions</h3>
                <p className="text-xs text-slate-400 mb-5">The group leader will review your answers before approving.</p>
                <div className="space-y-4 mb-6">
                  {group.questions.map((q, i) => (
                    <div key={i}>
                      <label className="text-xs font-bold text-slate-600 block mb-1.5">{q}</label>
                      <textarea
                        value={answers[i]}
                        onChange={(e) => {
                          const next = [...answers];
                          next[i] = e.target.value;
                          setAnswers(next);
                        }}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl resize-none outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-sm h-20 transition-all"
                        placeholder="Your answer…"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("rules")}
                    className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 cursor-pointer transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => { setStep("success"); onJoin(group.id); }}
                    disabled={!canSubmit}
                    className="flex-1 py-3 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Send Request
                  </button>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <FiCheck size={36} className="text-green-500" />
                </motion.div>
                <h3 className="font-black text-slate-800 text-lg mb-2">Request Sent!</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed max-w-[280px] mx-auto">
                  Your request is on its way to the group leader. You'll be notified once approved.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 cursor-pointer transition-all active:scale-95"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GroupCard({ group, onJoin }) {
  const pct = Math.round((group.members / group.maxMembers) * 100);
  const full = pct >= 90;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-transparent transition-all group flex flex-col"
    >
      <div className={`h-24 bg-gradient-to-br ${group.gradient} relative p-4 flex items-end justify-between`}>
        {group.trending && !group.isNew && (
          <span className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <FiTrendingUp size={9} /> Trending
          </span>
        )}
        {group.isNew && (
          <span className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            ✨ New
          </span>
        )}
        <div className="w-11 h-11 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-lg font-black">
          {group.name[0]}
        </div>
        <span className="text-[10px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">
          {group.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-slate-800 text-sm mb-1 leading-tight">{group.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1 line-clamp-2">{group.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {group.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Capacity bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span className="flex items-center gap-1"><FiUsers size={10} /> {group.members} members</span>
            <span className={full ? "text-red-400 font-semibold" : ""}>{pct}% full</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${full ? "bg-red-400" : "bg-gradient-to-r " + group.gradient}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {group.joined ? (
          <div className="flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-green-50 text-green-600 text-xs font-bold border border-green-100">
            <FiCheck size={13} />
            Joined
          </div>
        ) : (
          <button
            onClick={() => onJoin(group)}
            disabled={full}
            className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
              full
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : `bg-gradient-to-r ${group.gradient} text-white shadow-sm hover:opacity-90`
            }`}
          >
            {full ? "Group Full" : "Request to Join →"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [groups, setGroups] = useState(GROUPS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [joiningGroup, setJoiningGroup] = useState(null);

  const filtered = groups.filter((g) => {
    const q = search.toLowerCase();
    const matchSearch =
      g.name.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q));
    if (filter === "trending") return matchSearch && g.trending;
    if (filter === "new") return matchSearch && g.isNew;
    if (filter === "joined") return matchSearch && g.joined;
    return matchSearch;
  });

  function handleJoin(groupId) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, joined: true, members: g.members + 1 } : g
      )
    );
  }

  const FILTERS = [
    { id: "all",      label: "All Groups" },
    { id: "trending", label: "🔥 Trending" },
    { id: "new",      label: "✨ New" },
    { id: "joined",   label: "My Joins" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="max-w-[1000px] mx-auto">
          <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Explore Groups</h2>
              <p className="text-sm text-slate-400 mt-0.5">Find your community and start collaborating</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-2xl">
              <FiStar size={13} className="text-amber-400" />
              {groups.filter((g) => !g.joined).length} groups available
            </div>
          </header>

          {/* Search */}
          <div className="relative mb-5">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Search by name, subject, or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-500"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    onJoin={(g) => setJoiningGroup(g)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <FiCompass size={40} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-semibold">No groups match your search</p>
              <p className="text-slate-300 text-sm mt-1">Try a different keyword or filter</p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {joiningGroup && (
          <JoinModal
            group={joiningGroup}
            onClose={() => setJoiningGroup(null)}
            onJoin={(id) => { handleJoin(id); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
