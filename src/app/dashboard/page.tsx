"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, AlertCircle, Plus, LayoutDashboard, Briefcase, FileText, ArrowRight, BarChart3, TrendingUp, Download } from "lucide-react";
import { format, isBefore, startOfToday } from "date-fns";
import { useToast } from "@/components/Toast";

interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string;
  project: { id: string; name: string };
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) setTasks(await res.json());
    } catch {
      toast.show("Failed to load dashboard data", "error");
    } finally {
      setLoading(false);
    }
  };

  const today = startOfToday();
  const myTasks = tasks.filter((t) => session?.user?.role === "ADMIN" || true); // Assuming endpoint filters by user for members

  const stats = {
    total: myTasks.length,
    todo: myTasks.filter((t) => t.status === "TODO").length,
    inProgress: myTasks.filter((t) => t.status === "IN_PROGRESS").length,
    done: myTasks.filter((t) => t.status === "DONE").length,
    overdue: myTasks.filter(
      (t) => t.status !== "DONE" && isBefore(new Date(t.dueDate), today)
    ).length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const exportToCSV = () => {
    const headers = ["Task Title", "Project", "Status", "Due Date"];
    const rows = myTasks.map(t => [
      `"${t.title.replace(/"/g, '""')}"`, 
      `"${t.project.name.replace(/"/g, '""')}"`, 
      t.status, 
      format(new Date(t.dueDate), "yyyy-MM-dd")
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tasks_export_${format(new Date(), "yyyyMMdd")}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.show("Tasks exported successfully", "success");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-8 w-64 bg-slate-200 rounded animate-shimmer mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 animate-shimmer"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="mt-2 text-slate-500">Welcome back, {session?.user?.name}! Here's what's happening.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportToCSV} className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          {session?.user?.role === "ADMIN" && (
            <Link href="/projects" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm">
              <Briefcase className="w-4 h-4" /> Manage Projects
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Completed</p>
            <p className="text-3xl font-bold text-emerald-600">{stats.done}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 card-hover flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Overdue</p>
            <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-indigo-500" /> Overall Progress
          </h3>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray={`${completionRate}, 100`} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute text-3xl font-extrabold text-slate-900">{completionRate}%</div>
            </div>
            <p className="mt-6 text-sm text-slate-500 font-medium">Completion Rate</p>
          </div>
        </div>

        {/* Task List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> Recent Tasks
            </h3>
            <Link href="/projects" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {myTasks.length === 0 ? (
              <div className="p-10 text-center text-slate-500 text-sm">
                No tasks assigned to you right now.
              </div>
            ) : (
              myTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{task.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" /> {task.project.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                      task.status === "DONE" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      task.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      {task.status.replace("_", " ")}
                    </span>
                    <span className={`text-sm font-medium ${
                      isBefore(new Date(task.dueDate), today) && task.status !== "DONE" 
                        ? "text-red-600" 
                        : "text-slate-500"
                    }`}>
                      Due: {format(new Date(task.dueDate), "MMM d")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
