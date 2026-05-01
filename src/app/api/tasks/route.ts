import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // If ADMIN, see all tasks. If MEMBER, see only assigned tasks.
  const where = session.user.role === "ADMIN" ? {} : { assigneeId: session.user.id };

  const tasks = await prisma.task.findMany({
    where,
    include: { project: { select: { name: true } }, assignee: { select: { name: true } } },
    orderBy: { dueDate: 'asc' }
  });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const { title, description, status, dueDate, projectId, assigneeId } = await req.json();
    if (!title || !projectId) return NextResponse.json({ error: "Title and Project are required" }, { status: 400 });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "TODO",
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId,
        assigneeId: assigneeId || null
      }
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
