"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, CheckSquare, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <CheckSquare className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">TeamFlow</span>
            </Link>
            {session && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <LayoutDashboard className="w-4 h-4 mr-2"/>
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm font-medium text-slate-700">
                  {session.user?.name} <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full ml-1">{session.user?.role}</span>
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-slate-500 bg-white hover:text-slate-700 focus:outline-none transition ease-in-out duration-150"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-500 hover:text-slate-900 text-sm font-medium">
                  Log in
                </Link>
                <Link href="/register" className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
