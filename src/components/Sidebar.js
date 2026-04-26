"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiHome, FiCompass, FiUsers, FiUser, FiShield, FiLogOut, FiShare2, FiPlus } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";

const NAV_ITEMS = [
  { name: "Student Hub", icon: FiHome, href: "/hub" },
  { name: "Explore", icon: FiCompass, href: "/explore" },
  { name: "My Groups", icon: FiUsers, href: "/profile" },
  { name: "Profile", icon: FiUser, href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userData } = useAuth();

  const displayName = userData?.name || user?.email?.split("@")[0] || "Student";
  const role = userData?.role === "admin" ? "Admin" : "Student";
  const initial = displayName[0]?.toUpperCase() || "S";

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col p-5 z-10">
      <Link href="/hub" className="flex items-center gap-3 mb-8 px-1 group">
        <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors flex-shrink-0">
          <FiShare2 size={17} />
        </div>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Twassel</h1>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/hub" && item.href !== "/profile" && pathname.startsWith(item.href)) ||
            (item.href === "/profile" && (pathname === "/profile" || pathname.startsWith("/groups/")));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
                isActive
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <item.icon size={19} />
              <span>{item.name}</span>
            </Link>
          );
        })}
        {userData?.role === "admin" && (
          <Link
            href="/admin"
            className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold transition-all text-sm ${
              pathname === "/admin"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <FiShield size={19} />
            <span>Admin</span>
          </Link>
        )}
      </nav>

      <div className="mt-auto space-y-3">
        <Link
          href="/groups/create"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition-all border border-indigo-100"
        >
          <FiPlus size={17} />
          <span>New Group</span>
        </Link>

        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {initial}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{displayName}</p>
            <p className="text-xs text-slate-400">{role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-400 transition-all text-sm font-semibold cursor-pointer"
        >
          <FiLogOut size={17} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
