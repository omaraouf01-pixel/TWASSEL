"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiEdit2, FiUsers, FiBookOpen, FiStar,
  FiPlus, FiArrowRight, FiCamera, FiAward
} from "react-icons/fi";
import Sidebar from "@/components/Sidebar";

const MY_JOINED_GROUPS = [
  {
    id: "arch-design",
    name: "Architecture Design Hub",
    category: "Architecture",
    members: 22,
    gradient: "from-pink-500 to-rose-600",
    role: "Member",
    lastActivity: "2h ago",
  },
  {
    id: "cs-study-circle",
    name: "CS Study Circle",
    category: "Computer Science",
    members: 34,
    gradient: "from-indigo-500 to-purple-600",
    role: "Member",
    lastActivity: "5h ago",
  },
];

const MY_LED_GROUPS = [
  {
    id: "data-science-lab",
    name: "Data Science Lab",
    category: "Computer Science",
    members: 41,
    gradient: "from-emerald-500 to-teal-600",
    role: "Leader",
    lastActivity: "Just now",
    pendingRequests: 3,
  },
];

const RECENT_RESOURCES = [
  { name: "DB Management Summary.pdf", group: "CS Study Circle", size: "1.2 MB", time: "Yesterday" },
  { name: "Arch Project Renders.zip", group: "Architecture Hub", size: "34 MB", time: "3 days ago" },
  { name: "ML Intro Slides.pptx", group: "Data Science Lab", size: "5.6 MB", time: "1 week ago" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("joined");
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState("Passionate about algorithms, data science, and building things that matter. CS · 2nd Year.");

  const allGroups = activeTab === "joined" ? MY_JOINED_GROUPS : MY_LED_GROUPS;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="max-w-[820px] mx-auto space-y-6">

          {/* Profile card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="px-7 pb-7">
              <div className="flex items-end justify-between -mt-12 mb-5">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl border-4 border-white flex items-center justify-center text-white font-black text-3xl shadow-lg">
                    Y
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-indigo-600 transition-colors cursor-pointer">
                    <FiCamera size={13} />
                  </button>
                </div>
                <button
                  onClick={() => setEditBio(!editBio)}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <FiEdit2 size={14} />
                  Edit Profile
                </button>
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-black text-slate-800">Omar Aouf</h2>
                <p className="text-sm text-slate-400 mt-0.5">Computer Science · 2nd Year · Matricule: 23CS-1042</p>
              </div>

              {editBio ? (
                <div className="mb-5">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-indigo-300 rounded-2xl text-sm outline-none resize-none focus:ring-4 focus:ring-indigo-50 h-20 transition-all"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setEditBio(false)} className="px-4 py-1.5 rounded-xl bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-600 cursor-pointer transition-all">
                      Save
                    </button>
                    <button onClick={() => setEditBio(false)} className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{bio}</p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Groups Joined", value: MY_JOINED_GROUPS.length, icon: FiUsers, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { label: "Resources Shared", value: 12, icon: FiBookOpen, color: "text-emerald-500", bg: "bg-emerald-50" },
                  { label: "Groups Leading", value: MY_LED_GROUPS.length, icon: FiStar, color: "text-amber-500", bg: "bg-amber-50" },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.bg} rounded-2xl p-4 text-center border border-white`}>
                    <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={20} />
                    <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Groups */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-slate-800">My Groups</h3>
              <Link
                href="/groups/create"
                className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-all active:scale-95"
              >
                <FiPlus size={15} />
                Create Group
              </Link>
            </div>

            {/* Tab toggle */}
            <div className="flex gap-2 mb-5">
              {[
                { id: "joined", label: "Joined", count: MY_JOINED_GROUPS.length },
                { id: "leading", label: "Leading", count: MY_LED_GROUPS.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-500 text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {allGroups.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <FiAward size={32} className="mx-auto mb-3 text-slate-200" />
                  <p className="text-sm font-medium">No groups yet</p>
                </div>
              ) : (
                allGroups.map((group, i) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/groups/${group.id}`}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 hover:border-indigo-100 transition-all group"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.gradient} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}
                      >
                        {group.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 text-sm truncate">{group.name}</h4>
                        <p className="text-xs text-slate-400">{group.members} members · {group.category}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {group.pendingRequests > 0 && (
                          <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {group.pendingRequests} pending
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            group.role === "Leader"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          {group.role}
                        </span>
                        <FiArrowRight size={15} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Recent Resources */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="font-black text-slate-800 mb-5">Recently Shared Resources</h3>
            <div className="space-y-3">
              {RECENT_RESOURCES.map((res, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all group">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBookOpen size={16} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{res.name}</p>
                    <p className="text-xs text-slate-400">{res.group} · {res.size}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 flex-shrink-0">{res.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
