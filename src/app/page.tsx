import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-12">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
          Manage your team&apos;s tasks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">ease</span>.
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          TeamFlow brings your team together. Assign tasks, track progress, and ship projects faster than ever before.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Log In
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 w-full">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Layout className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Organize Projects</h3>
          <p className="text-slate-500 text-sm">Create projects and break them down into manageable pieces.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-cyan-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Team Collaboration</h3>
          <p className="text-slate-500 text-sm">Assign tasks to team members with role-based access control.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Track Progress</h3>
          <p className="text-slate-500 text-sm">Keep everyone on the same page with real-time status updates.</p>
        </div>
      </div>
    </div>
  );
}
