"use client";
import Link from "next/link";
import { ArrowRight, Box, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-100 to-transparent -z-10"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] -z-10"></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-800 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            TaskFlow 2.0 is live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900 mb-8 animate-fade-up animate-stagger-1 leading-[1.1]">
            Build better <br/>
            <span className="text-gradient-primary">together.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 animate-fade-up animate-stagger-2 font-medium leading-relaxed">
            The ultra-clear, deeply intuitive workspace for teams that want to execute faster and ship higher quality work without the clutter.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-up animate-stagger-3">
            <Link href="/register" className="neo-button text-lg px-10 py-4 flex items-center gap-2 w-full sm:w-auto justify-center">
              Start Building Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="text-lg font-bold text-slate-700 bg-white border-2 border-slate-200 px-10 py-4 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all w-full sm:w-auto justify-center flex items-center shadow-sm">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Product Image Mockup */}
      <section className="px-6 pb-32 animate-fade-up animate-stagger-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent z-10 h-full w-full"></div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-2">
            <div className="bg-slate-100 rounded-2xl border border-slate-200 h-[600px] flex items-center justify-center relative overflow-hidden">
               {/* Abstract Dashboard Representation */}
               <div className="absolute inset-0 p-8 grid grid-cols-3 gap-6 opacity-40">
                 <div className="col-span-1 space-y-4"><div className="h-20 bg-white rounded-xl shadow-sm"></div><div className="h-40 bg-white rounded-xl shadow-sm"></div><div className="h-20 bg-white rounded-xl shadow-sm"></div></div>
                 <div className="col-span-1 space-y-4"><div className="h-32 bg-white rounded-xl shadow-sm"></div><div className="h-20 bg-white rounded-xl shadow-sm"></div><div className="h-60 bg-white rounded-xl shadow-sm"></div></div>
                 <div className="col-span-1 space-y-4"><div className="h-10 bg-white rounded-xl shadow-sm"></div><div className="h-52 bg-white rounded-xl shadow-sm"></div><div className="h-20 bg-white rounded-xl shadow-sm"></div></div>
               </div>
               <h2 className="text-4xl font-extrabold text-slate-300 tracking-tight z-10">Clear. Fast. Focused.</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <Box className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Crystal Clear Kanban</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Drag, drop, and conquer. Our workspace is designed to eliminate visual noise so you only see what matters.</p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Built on Next.js 14 and Turbopack. Every interaction is instantaneous. Say goodbye to loading spinners.</p>
            </div>
            <div className="space-y-4">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Ironclad Security</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Strict Role-Based Access Control means your data is perfectly segregated between Admins and Members.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
