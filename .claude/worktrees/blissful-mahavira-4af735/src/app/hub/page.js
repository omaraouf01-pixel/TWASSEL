"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiCompass, FiUsers, FiUser, FiShield,
  FiImage, FiSend, FiHeart, FiMessageCircle, FiMoreHorizontal, FiShare2, FiLogOut
} from "react-icons/fi";

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Ahmed M.",
    major: "Computer Science",
    time: "2 hours ago",
    content: "Does anyone have the summary for the Database Management module? The midterm is next week and I'm a bit lost! 📚😅",
    likes: 12,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    author: "Sarah K.",
    major: "Architecture",
    time: "5 hours ago",
    content: "Just submitted my final 3D rendering project! So relieved. Wishing everyone good luck with their submissions this week! 🏛️✨",
    likes: 45,
    comments: 8,
    liked: false,
  },
];

const TAB_PLACEHOLDERS = {
  Explore: { title: "Explore", desc: "Discover trending posts and topics across the campus." },
  Groups: { title: "My Groups", desc: "You haven't joined any groups yet. Start exploring!" },
  Profile: { title: "Profile", desc: "Your profile page is coming soon." },
  Admin: { title: "Admin Panel", desc: "Admin tools and moderation panel." },
};

export default function StudentHubPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Hub");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [postText, setPostText] = useState("");

  function toggleLike(id) {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  }

  function submitPost() {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: "You",
      major: "Student",
      time: "Just now",
      content: postText.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setPostText("");
  }

  const navItems = [
    { name: "Student Hub", icon: FiHome, id: "Hub" },
    { name: "Explore", icon: FiCompass, id: "Explore" },
    { name: "My Groups", icon: FiUsers, id: "Groups" },
    { name: "Profile", icon: FiUser, id: "Profile" },
    { name: "Admin", icon: FiShield, id: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col p-6 z-10">
        <div className="flex items-center gap-3 mb-10 text-indigo-500">
          <FiShare2 size={28} />
          <h1 className="text-2xl font-bold tracking-wide text-slate-800">Twassel</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold">
              Y
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800">You</p>
              <p className="text-xs text-slate-500">Student</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/auth")}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all text-sm font-semibold cursor-pointer"
          >
            <FiLogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 flex justify-center">
        <div className="w-full max-w-[650px]">

          <AnimatePresence mode="wait">

            {/* Hub Feed */}
            {activeTab === "Hub" && (
              <motion.div key="hub" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <header className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Student Hub</h2>
                  <p className="text-sm text-slate-500">See what's happening around the campus.</p>
                </header>

                {/* Create Post */}
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 mb-8">
                  <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center text-indigo-500 font-bold">
                      Y
                    </div>
                    <textarea
                      placeholder="Share a question, resource, or thought with your peers..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      className="w-full bg-transparent resize-none outline-none text-slate-700 text-sm pt-2"
                      rows="2"
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium px-2 py-1 rounded-lg hover:bg-indigo-50 cursor-pointer">
                      <FiImage size={18} />
                      <span>Add Image</span>
                    </button>
                    <button
                      onClick={submitPost}
                      disabled={!postText.trim()}
                      className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-indigo-100 hover:bg-indigo-600 transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      <span>Post</span>
                      <FiSend size={16} />
                    </button>
                  </div>
                </div>

                {/* Feed */}
                <div className="space-y-6">
                  <AnimatePresence>
                    {posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index < 3 ? index * 0.1 : 0 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                              {post.author[0]}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{post.author}</h4>
                              <p className="text-xs text-slate-500">{post.major} • {post.time}</p>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
                            <FiMoreHorizontal size={20} />
                          </button>
                        </div>

                        <p className="text-slate-700 text-sm leading-relaxed mb-4">{post.content}</p>

                        <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-2 transition-colors text-sm font-medium group cursor-pointer ${post.liked ? "text-pink-500" : "text-slate-500 hover:text-pink-500"}`}
                          >
                            <div className={`p-2 rounded-full transition-colors ${post.liked ? "bg-pink-50" : "group-hover:bg-pink-50"}`}>
                              <FiHeart size={18} className={post.liked ? "fill-pink-500" : ""} />
                            </div>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium group cursor-pointer">
                            <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                              <FiMessageCircle size={18} />
                            </div>
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Placeholder tabs */}
            {activeTab !== "Hub" && (
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  {(() => {
                    const item = navItems.find(n => n.id === activeTab);
                    const Icon = item?.icon;
                    return Icon ? <Icon size={36} className="text-indigo-400" /> : null;
                  })()}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{TAB_PLACEHOLDERS[activeTab]?.title}</h2>
                <p className="text-slate-500 text-sm max-w-xs">{TAB_PLACEHOLDERS[activeTab]?.desc}</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
