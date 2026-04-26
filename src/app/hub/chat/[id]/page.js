"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend, FiPaperclip, FiUsers, FiArrowLeft,
  FiFileText, FiDownload, FiX,
  FiUserX, FiCheck, FiClock, FiSettings, FiMessageSquare
} from "react-icons/fi";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, serverTimestamp, doc, getDoc
} from "firebase/firestore";

const GroupSettingsModal = ({ isOpen, onClose, roomData }) => {
  const [settings, setSettings] = useState({
    name: roomData?.name || "Study Group",
    subject: roomData?.subject || "General",
    description: roomData?.description || "",
    rules: roomData?.rules || "",
    question: roomData?.question || "Why do you want to join?",
  });

  useEffect(() => {
    if (roomData) {
      setSettings({
        name: roomData.name || "Study Group",
        subject: roomData.subject || "General",
        description: roomData.description || "",
        rules: roomData.rules || "",
        question: roomData.question || "Why do you want to join?",
      });
    }
  }, [roomData]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden text-slate-800 max-h-[90vh] overflow-y-auto"
      >
        <div className="p-5 bg-indigo-600 text-white flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-sm font-bold flex items-center gap-2"><FiSettings size={16} /> Circle Settings</h2>
          <button onClick={onClose}><FiX size={18} /></button>
        </div>
        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {[
            { label: "Group Name", key: "name", type: "input" },
            { label: "Subject / Field", key: "subject", type: "input" },
            { label: "Description", key: "description", type: "textarea" },
            { label: "Join Rules", key: "rules", type: "textarea" },
            { label: "Screening Question", key: "question", type: "textarea" },
          ].map(({ label, key, type }) => (
            <div key={key} className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
              {type === "input" ? (
                <input
                  value={settings[key]}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 transition-all"
                />
              ) : (
                <textarea
                  value={settings[key]}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-indigo-500 h-20 resize-none transition-all"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase shadow-lg hover:bg-indigo-700 transition-all"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default function StudyRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([
    { id: 10, name: "Chapter3_Summary.pdf", uploader: "Yassine B.", time: "5 min ago" },
    { id: 11, name: "Practice_Exercises.docx", uploader: "Imane R.", time: "12 min ago" },
  ]);
  const [resources] = useState([
    { id: 1, name: "Lecture_Notes.pdf", uploader: "Sami R." },
    { id: 2, name: "Lab_Work_01.zip", uploader: "Amira K." },
  ]);

  const messagesEndRef = useRef(null);

  // Auth state — redirect if not logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/auth");
        return;
      }
      setCurrentUser(firebaseUser);
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      if (snap.exists()) setUserData(snap.data());
    });
    return unsub;
  }, [router]);

  // Load room metadata
  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, "rooms", id)).then((snap) => {
      if (snap.exists()) {
        setRoomData(snap.data());
        if (snap.data().membersList) setMembers(snap.data().membersList);
      }
    });
  }, [id]);

  // Real-time messages listener
  useEffect(() => {
    if (!id) return;
    const q = query(
      collection(db, "rooms", id, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [id]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !currentUser || sending) return;
    const text = message.trim();
    setMessage("");
    setSending(true);
    try {
      await addDoc(collection(db, "rooms", id, "messages"), {
        text,
        uid: currentUser.uid,
        userName: userData?.name || currentUser.email?.split("@")[0] || "Student",
        createdAt: serverTimestamp(),
      });
    } finally {
      setSending(false);
    }
  };

  const isLeader = roomData?.leaderId === currentUser?.uid;
  const roomName = roomData?.name || "Study Group";
  const memberCount = roomData?.memberCount || members.length || 0;

  const approveFile = (fileId) => setPendingFiles((prev) => prev.filter((f) => f.id !== fileId));
  const rejectFile = (fileId) => setPendingFiles((prev) => prev.filter((f) => f.id !== fileId));

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">

      {/* Left sidebar — Resources */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <button
            onClick={() => router.push("/hub")}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
          >
            <FiArrowLeft />
          </button>
          <h2 className="font-bold text-slate-800 text-sm">Resources</h2>
          {isLeader && pendingFiles.length > 0 && (
            <span className="ml-auto bg-amber-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {pendingFiles.length}
            </span>
          )}
        </div>

        {isLeader && pendingFiles.length > 0 && (
          <div className="p-4 border-b border-slate-100 space-y-2">
            <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <FiClock size={10} /> Awaiting Validation
            </p>
            {pendingFiles.map((file) => (
              <div key={file.id} className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <FiFileText className="text-amber-500 shrink-0" size={12} />
                  <span className="text-[10px] font-bold text-slate-700 truncate">{file.name}</span>
                </div>
                <p className="text-[9px] text-slate-400 mb-2">by {file.uploader} · {file.time}</p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => approveFile(file.id)}
                    className="flex-1 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase hover:bg-indigo-700 transition-all"
                  >
                    <FiCheck className="inline" /> OK
                  </button>
                  <button
                    onClick={() => rejectFile(file.id)}
                    className="flex-1 py-1 bg-white text-rose-500 border border-rose-100 rounded-lg text-[9px] font-black uppercase hover:bg-rose-50 transition-all"
                  >
                    <FiX className="inline" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {resources.map((file) => (
            <div
              key={file.id}
              className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FiFileText className="text-indigo-500 shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[11px] font-bold truncate text-slate-600 block">{file.name}</span>
                  <span className="text-[9px] text-slate-400">by {file.uploader}</span>
                </div>
              </div>
              <FiDownload className="text-slate-300 group-hover:text-indigo-500 cursor-pointer transition-colors shrink-0" />
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full py-3 bg-slate-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
            <FiPaperclip /> Upload File
          </button>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col bg-white">
        <header className="h-20 border-b border-slate-100 px-6 flex justify-between items-center shadow-sm bg-white">
          <div className="flex items-center gap-4">
            <div
              className="lg:hidden p-2 hover:bg-slate-50 rounded-xl cursor-pointer"
              onClick={() => router.push("/hub")}
            >
              <FiArrowLeft />
            </div>
            <div className="w-10 h-10 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <FiUsers size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-base text-slate-800">{roomName}</h1>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                {memberCount > 0 ? `${memberCount} Members · ` : ""}Online
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setShowMembers(true)}
              className="p-3 text-slate-400 hover:text-indigo-500 transition-colors"
              title="View Members"
            >
              <FiUsers size={20} />
            </button>
            {isLeader && (
              <button
                onClick={() => setShowSettings(true)}
                className="p-3 text-slate-400 hover:text-indigo-500 transition-colors"
                title="Circle Settings"
              >
                <FiSettings size={20} />
              </button>
            )}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-3">
              <FiMessageSquare size={40} />
              <p className="text-sm font-semibold">No messages yet — start the conversation!</p>
            </div>
          )}
          {messages.map((msg) => {
            const isMe = msg.uid === currentUser?.uid;
            const time = msg.createdAt?.toDate?.()?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                  <span className="text-[10px] font-black text-slate-400 mb-1 ml-2 uppercase">
                    {msg.userName}
                  </span>
                )}
                <div
                  className={`max-w-md p-4 shadow-sm border ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-[1.5rem] rounded-tr-none border-indigo-500"
                      : "bg-white text-slate-600 rounded-[1.5rem] rounded-tl-none border-slate-100"
                  }`}
                >
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
                {time && (
                  <span className="text-[8px] text-slate-300 mt-1 font-bold">{time}</span>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
            <button
              type="submit"
              disabled={!message.trim() || sending}
              className="bg-indigo-500 text-white p-3.5 rounded-2xl hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
            >
              <FiSend size={20} />
            </button>
          </form>
        </div>
      </main>

      <GroupSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        roomData={roomData}
      />

      {/* Members Panel */}
      <AnimatePresence>
        {showMembers && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="bg-white w-full max-w-sm h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">
                  Members {members.length > 0 ? `(${members.length})` : ""}
                </h3>
                <button
                  onClick={() => setShowMembers(false)}
                  className="p-2 hover:bg-slate-50 rounded-full"
                >
                  <FiX />
                </button>
              </div>
              <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                {members.length === 0 ? (
                  <p className="text-center text-slate-400 text-xs py-8">No members data available</p>
                ) : (
                  members.map((member, i) => (
                    <div
                      key={member.uid || i}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
                        {member.name?.[0] || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-slate-700 block">{member.name}</span>
                        <span className={`text-[9px] font-black uppercase ${member.role === "Leader" ? "text-amber-500" : "text-slate-400"}`}>
                          {member.role || "Member"}
                        </span>
                      </div>
                      {isLeader && member.uid !== currentUser?.uid && (
                        <button
                          className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-all"
                          title="Remove member"
                        >
                          <FiUserX size={14} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
