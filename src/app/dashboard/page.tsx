"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, AlertCircle, Plus, LayoutDashboard, Briefcase, FileText } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          setTasks(Array.isArray(data) ? data : []);
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "loading" || loading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (!session) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please log in to view your dashboard</h2>
        <Link href="/login" className="mt-4 inline-block text-indigo-600">Go to login</Link>
      </div>
    );
  }

  const todoTasks = tasks.filter((t) => t.status === "TODO");
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((t) => t.status === "DONE");
  const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "DONE");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-indigo-600" /> Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Welcome back, {session.user.name}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/projects" className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors">
            <Briefcase className="h-5 w-5 mr-2" /> Projects
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center text-slate-500 mb-2">
            <FileText className="h-5 w-5 mr-2" /> To Do
          </div>
          <div className="text-3xl font-bold text-slate-900">{todoTasks.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center text-blue-500 mb-2">
            <Clock className="h-5 w-5 mr-2" /> In Progress
          </div>
          <div className="text-3xl font-bold text-slate-900">{inProgressTasks.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center text-emerald-500 mb-2">
            <CheckCircle2 className="h-5 w-5 mr-2" /> Completed
          </div>
          <div className="text-3xl font-bold text-slate-900">{doneTasks.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
          <div className="flex items-center text-red-500 mb-2">
            <AlertCircle className="h-5 w-5 mr-2" /> Overdue
          </div>
          <div className="text-3xl font-bold text-red-600">{overdueTasks.length}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Your Tasks</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No tasks assigned to you yet.</div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-slate-900">{task.title}</h4>
                  <div className="flex items-center text-sm text-slate-500 mt-1 space-x-4">
                    <span>Project: {task.project?.name}</span>
                    {task.dueDate && <span>Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>}
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === "DONE" ? "bg-emerald-100 text-emerald-800" :
                    task.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" :
                    "bg-slate-100 text-slate-800"
                  }`}>
                    {task.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
