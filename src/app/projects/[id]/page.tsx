"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, use } from "react";
import { format } from "date-fns";
import { Plus, User as UserIcon, Calendar, CheckCircle2, Circle, Clock, LayoutDashboard, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";

interface User {
  id: string;
  name: string;
}

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: string;
  assignedTo: User | null;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  tasks: Task[];
}

export default function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    dueDate: "",
    assignedToId: "",
  });

  useEffect(() => {
    fetchProject();
    if (session?.user?.role === "ADMIN") {
      fetchUsers();
    }
  }, [session]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${resolvedParams.id}`);
      if (res.ok) {
        setProject(await res.json());
      }
    } catch {
      toast.show("Failed to load project details", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    if (res.ok) {
      setUsers(await res.json());
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTask, projectId: resolvedParams.id }),
      });
      
      if (res.ok) {
        toast.show("Task created successfully", "success");
        setIsModalOpen(false);
        setNewTask({ title: "", description: "", status: "TODO", dueDate: "", assignedToId: "" });
        fetchProject();
      }
    } catch {
      toast.show("Failed to create task", "error");
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.show("Status updated", "success");
        fetchProject();
      } else {
        toast.show("Unauthorized or failed to update", "error");
      }
    } catch {
      toast.show("Error updating task", "error");
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex justify-center">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  if (!project) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-slate-900">Project not found</h2>
      <Link href="/projects" className="text-indigo-600 hover:underline mt-4 inline-block">Go back to projects</Link>
    </div>
  );

  const statusColors = {
    TODO: "bg-slate-100 text-slate-700 border-slate-200",
    IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
    DONE: "bg-emerald-50 text-emerald-700 border-emerald-200"
  };

  const columns = ["TODO", "IN_PROGRESS", "DONE"] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Link href="/projects" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{project.name}</h1>
          <p className="mt-2 text-slate-500 max-w-2xl">{project.description}</p>
        </div>
        {session?.user?.role === "ADMIN" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        )}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {columns.map(status => (
          <div key={status} className="bg-slate-50/50 rounded-2xl border border-slate-200/60 p-4 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {status === "TODO" && <Circle className="w-4 h-4 text-slate-400" />}
                {status === "IN_PROGRESS" && <Clock className="w-4 h-4 text-blue-500" />}
                {status === "DONE" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {status.replace("_", " ")}
              </h3>
              <span className="bg-white text-slate-600 text-xs font-semibold px-2 py-1 rounded-full border border-slate-200 shadow-sm">
                {project.tasks.filter(t => t.status === status).length}
              </span>
            </div>

            <div className="space-y-3">
              {project.tasks.filter(t => t.status === status).map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm card-hover">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">{task.title}</h4>
                  {task.description && (
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs mt-4">
                    <div className="flex items-center text-slate-500 gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      <Calendar className="w-3.5 h-3.5" />
                      {format(new Date(task.dueDate), "MMM d")}
                    </div>
                    {task.assignedTo && (
                      <div className="flex items-center gap-1.5" title={`Assigned to ${task.assignedTo.name}`}>
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] border border-indigo-200">
                          {task.assignedTo.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className={`text-xs w-full p-1.5 rounded-lg border font-medium outline-none cursor-pointer ${statusColors[task.status]}`}
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="DONE">Done</option>
                    </select>
                  </div>
                </div>
              ))}
              
              {project.tasks.filter(t => t.status === status).length === 0 && (
                <div className="text-center py-8 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                  No tasks here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Create New Task</h3>
            </div>
            <form onSubmit={handleCreateTask} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      required
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
                    <select
                      value={newTask.assignedToId}
                      onChange={(e) => setNewTask({ ...newTask, assignedToId: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
                    >
                      <option value="">Unassigned</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
