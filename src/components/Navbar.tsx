"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { CheckSquare, LayoutDashboard, Briefcase, LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = session ? [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: Briefcase },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">TeamFlow</span>
            </Link>
            {session && (
              <div className="hidden sm:flex items-center gap-1">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      pathname.startsWith(href)
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-900 leading-none">{session.user?.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{session.user?.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 animate-scale-in">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
