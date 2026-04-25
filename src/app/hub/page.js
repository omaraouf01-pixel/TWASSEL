"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiImage, FiSend, FiHeart, FiMessageCircle, FiMoreHorizontal,
  FiTrendingUp, FiBell, FiBookOpen, FiZap
} from "react-icons/fi";
import Sidebar from "@/components/Sidebar";

const TAG_COLORS = {
  Question:  "bg-amber-50  text-amber-600  border-amber-200",
  Reminder:  "bg-red-50    text-red-500    border-red-200",
  Milestone: "bg-green-50  text-green-600  border-green-200",
  Tip:       "bg-blue-50   text-blue-600   border-blue-200",
  General:   "bg-slate-100 text-slate-500  border-slate-200",
};

const AVATAR_GRADIENTS = [
  "from-indigo-400 to-purple-500",
  "from-pink-400   to-rose-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400  to-orange-500",
  "from-blue-400   to-cyan-500",
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Ahmed M.",
    major: "Computer Science",
    time: "2h ago",
    content: "Does anyone have the summary for the Database Management module? The midterm is next week and I'm really lost 📚😅 — please drop it in the CS Study Circle!",
    likes: 12,
    comments: 5,
    liked: false,
    tag: "Question",
    avatarIdx: 0,
  },
  {
    id: 2,
    author: "Sarah K.",
    major: "Architecture",
    time: "5h ago",
    content: "Just submitted my final 3D rendering project! So relieved 🏛️✨ Wishing everyone good luck with their submissions this week — you've got this!",
    likes: 45,
    comments: 8,
    liked: false,
    tag: "Milestone",
    avatarIdx: 1,
  },
  {
    id: 3,
    author: "Omar R.",
    major: "Mathematics",
    time: "8h ago",
    content: "📐 Reminder: Math Analysis exam is TOMORROW at 9 am, room B-204. Don't forget your scientific calculator — it's mandatory this time.",
    likes: 89,
    comments: 23,
    liked: false,
    tag: "Reminder",
    avatarIdx: 2,
  },
  {
    id: 4,
    author: "Lina T.",
    major: "Computer Science",
    time: "12h ago",
    content: "Just discovered Python's walrus operator := — I've been writing ugly if-blocks for 2 years for nothing 😭 Check the pinned resource in Data Science Lab for examples.",
    likes: 31,
    comments: 11,
    liked: false,
    tag: "Tip",
    avatarIdx: 3,
  },
  {
    id: 5,
    author: "Yasmine B.",
    major: "Business Management",
    time: "1d ago",
    content: "Our Startup & Innovation group is accepting new members! We're working on 3 real MVPs this semester. If you have an idea or just want to learn — come join us 🚀",
    likes: 67,
    comments: 19,
    liked: false,
    tag: "General",
    avatarIdx: 4,
  },
];

const HIGHLIGHTS = [
  { text: "CS Study Circle uploaded 3 new files", time: "1h ago", dot: "bg-indigo-400" },
  { text: "Math Analysis exam tomorrow at 9am (B-204)", time: "3h ago", dot: "bg-red-400" },
  { text: "Data Science Lab — new group trending 🔥", time: "5h ago", dot: "bg-emerald-400" },
  { text: "Architecture Hub: deadline extended to Friday", time: "6h ago", dot: "bg-amber-400" },
];

export default function StudentHubPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [postText, setPostText] = useState("");
  const [selectedTag, setSelectedTag] = useState("General");

  function toggleLike(id) {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  }

  function submitPost() {
    if (!postText.trim()) return;
    setPosts(prev => [
      {
        id: Date.now(),
        author: "You",
        major: "Student",
        time: "Just now",
        content: postText.trim(),
        likes: 0,
        comments: 0,
        liked: false,
        tag: selectedTag,
        avatarIdx: 0,
      },
      ...prev,
    ]);
    setPostText("");
    setSelectedTag("General");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 flex gap-7 justify-center">
        {/* Feed column */}
        <div className="w-full max-w-[600px]">
          <header className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Student Hub</h2>
              <p className="text-sm text-slate-400 mt-0.5">What's happening around campus today</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-2xl">
              <FiZap size={13} className="text-amber-400" />
              <span className="font-semibold">Refreshes daily</span>
            </div>
          </header>

          {/* Create Post */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 mb-7">
            <div className="flex gap-3.5 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                Y
              </div>
              <textarea
                placeholder="Share a question, resource, or thought with your peers…"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full bg-transparent resize-none outline-none text-slate-700 text-sm pt-1.5 placeholder:text-slate-400 leading-relaxed"
                rows={2}
              />
            </div>

            <div className="flex gap-2 mb-3 flex-wrap">
              {Object.keys(TAG_COLORS).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTag === tag
                      ? TAG_COLORS[tag] + " ring-2 ring-offset-1 ring-indigo-200"
                      : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors text-sm font-medium px-2 py-1 rounded-xl hover:bg-indigo-50 cursor-pointer">
                <FiImage size={17} />
                <span>Image</span>
              </button>
              <button
                onClick={submitPost}
                disabled={!postText.trim()}
                className="flex items-center gap-2 bg-indigo-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md shadow-indigo-100 hover:bg-indigo-600 transition-all active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Post</span>
                <FiSend size={14} />
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-5">
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ delay: index < 5 ? index * 0.06 : 0 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-100 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${AVATAR_GRADIENTS[post.avatarIdx % AVATAR_GRADIENTS.length]} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                      >
                        {post.author[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{post.author}</h4>
                        <p className="text-xs text-slate-400">{post.major} · {post.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${TAG_COLORS[post.tag] || TAG_COLORS.General}`}>
                        {post.tag}
                      </span>
                      <button className="text-slate-300 hover:text-slate-500 cursor-pointer p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiMoreHorizontal size={17} />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed mb-5">{post.content}</p>

                  <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm font-semibold transition-all group/btn cursor-pointer ${
                        post.liked ? "text-pink-500" : "text-slate-400 hover:text-pink-500"
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl transition-colors ${post.liked ? "bg-pink-50" : "group-hover/btn:bg-pink-50"}`}>
                        <FiHeart size={16} className={post.liked ? "fill-pink-500" : ""} />
                      </div>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors text-sm font-semibold group/btn cursor-pointer">
                      <div className="p-1.5 rounded-xl group-hover/btn:bg-indigo-50 transition-colors">
                        <FiMessageCircle size={16} />
                      </div>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right sidebar — hidden on smaller screens */}
        <div className="w-72 flex-shrink-0 hidden xl:block">
          <div className="sticky top-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <FiBell size={15} className="text-indigo-500" />
                <h3 className="font-bold text-slate-800 text-sm">Today at a Glance</h3>
              </div>
              <div className="space-y-4">
                {HIGHLIGHTS.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.dot}`} />
                    <div>
                      <p className="text-xs text-slate-700 leading-relaxed">{item.text}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                <FiBookOpen size={18} />
              </div>
              <h3 className="font-bold text-sm mb-1">Start a Study Group</h3>
              <p className="text-xs opacity-70 mb-4 leading-relaxed">
                Gather classmates around any subject and collaborate in real time.
              </p>
              <a
                href="/groups/create"
                className="block text-center bg-white text-indigo-600 font-bold text-xs py-2.5 rounded-2xl hover:bg-indigo-50 transition-all"
              >
                Create Group →
              </a>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <FiTrendingUp size={15} className="text-emerald-500" />
                <h3 className="font-bold text-slate-800 text-sm">Trending Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["#Algorithms", "#Midterm", "#3DRender", "#DataScience", "#Python", "#Exam"].map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
