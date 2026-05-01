"use client";
import Link from "next/link";
import { CheckSquare, ArrowRight, Layout, Users, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-8 border border-indigo-100 shadow-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
            TeamFlow 2.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Manage work.<br/>
            <span className="gradient-text">Beautifully.</span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            The all-in-one platform for modern teams to plan, track, and collaborate on projects with ease. Stop juggling tools and start shipping.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/register" className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to scale</h2>
            <p className="mt-4 text-lg text-slate-500">Powerful features built directly into the platform so your team can focus on what matters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-hover animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kanban Boards</h3>
              <p className="text-slate-500">Visualize your workflow with drag-and-drop boards. See exactly what needs to be done, is in progress, and finished.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-hover animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Role-based Access</h3>
              <p className="text-slate-500">Secure your workspace with Admin and Member roles. Control exactly who can create projects and assign tasks.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 card-hover animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Dashboard</h3>
              <p className="text-slate-500">Get a bird's eye view of your team's velocity with live charts, completion rates, and priority task lists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl text-slate-900">TeamFlow</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 TeamFlow Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
