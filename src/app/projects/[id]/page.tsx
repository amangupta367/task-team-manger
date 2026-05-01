"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Plus, User as UserIcon } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [project, setProject] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchProject = () => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session) {
      fetchProject();
      if (session.user.role === "ADMIN") {
        fetch("/api/users").then(res => res.json()).then(data => setUsers(Array.isArray(data) ? data : []));
      }
    }
  }, [id, session]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, projectId: id, assigneeId: assigneeId || null, dueDate }),
    });
    if (res.ok) {
      setIsModalOpen(false);
      setTitle(""); setDescription(""); setAssigneeId(""); setDueDate("");
      fetchProject();
    }
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchProject();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  if (!project || project.error) return <div className="text-center py-20 text-red-500">Project not found</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-extrabold text-slate-900">{project.name}</h1>
        <p className="text-slate-500 mt-2">{project.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
        {session?.user.role === "ADMIN" && (
          <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" /> Add Task
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {project.tasks?.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No tasks in this project yet.</div>
          ) : (
            project.tasks?.map((task: any) => (
              <div key={task.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-slate-900">{task.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                  <div className="flex items-center text-xs text-slate-500 mt-3 space-x-4">
                    <span className="flex items-center"><UserIcon className="h-3 w-3 mr-1" /> {task.assignee?.name || 'Unassigned'}</span>
                    {task.dueDate && <span>Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    disabled={session?.user.role !== "ADMIN" && task.assigneeId !== session?.user.id}
                    className={`text-sm rounded-lg border-slate-200 focus:ring-indigo-500 ${
                      task.status === "DONE" ? "bg-emerald-50 text-emerald-700" :
                      task.status === "IN_PROGRESS" ? "bg-blue-50 text-blue-700" :
                      "bg-slate-50 text-slate-700"
                    }`}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Add Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
                <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">Unassigned</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
