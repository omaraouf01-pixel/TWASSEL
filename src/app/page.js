import Link from 'next/link';
import { FiShare2 } from 'react-icons/fi';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="text-center">
        {/* اللوغو بنفس لون صفحة الـ Auth تماماً */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-indigo-500 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <FiShare2 size={40} />
          </div>
          <h1 className="text-3xl font-black text-indigo-900 tracking-tighter">Twassel</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Welcome to Twassel</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto">The modern student community. Connect, share, and grow with your peers.</p>
        
        <Link href="/auth" className="inline-block bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-600 transition-all hover:-translate-y-1 active:scale-95">
          Get Started
        </Link>
      </div>
    </main>
  )
}