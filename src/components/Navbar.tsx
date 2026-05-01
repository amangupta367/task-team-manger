"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, LogOut, ChevronDown, Hexagon } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = session ? [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/projects", label: "Workspaces", icon: Briefcase },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 neo-blur">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
                <Hexagon className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">TaskFlow</span>
            </Link>
            
            {session && (
              <div className="hidden md:flex items-center gap-2 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
                {navItems.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200/60"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 leading-tight">{session.user?.name}</p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{session.user?.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-fade-up">
                    <div className="px-5 py-3 border-b border-slate-100 mb-2">
                      <p className="text-sm font-bold text-slate-900">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 mt-1 truncate">{session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors">
                  Sign in
                </Link>
                <Link href="/register" className="neo-button">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
