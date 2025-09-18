import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/todos", async (req, res) => {
  const range = req.query.range ? (JSON.parse(String(req.query.range)) as [number, number]) : [0, 9];
  const [start, end] = range;
  const take = Math.max(0, end - start + 1);
  const skip = Math.max(0, start);

  const filter = req.query.filter ? (JSON.parse(String(req.query.filter)) as Record<string, any>) : {};
  const where: any = {};

  if (filter.q) {
    where.text = { contains: String(filter.q), mode: "insensitive" };
  }
  if (filter.completed !== undefined) {
    where.completed = typeof filter.completed === "string" ? filter.completed === "true" : Boolean(filter.completed);
  }
  if (Array.isArray(filter.ids)) {
    where.id = { in: filter.ids.map(String) };
  }

  const total = await prisma.todo.count({ where });
  const todos = await prisma.todo.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  res.set("Content-Range", `todos ${start}-${start + todos.length - 1}/${total}`);
  res.set("Access-Control-Expose-Headers", "Content-Range");
  res.json(todos.map(t => ({ ...t, title: t.text })));
});

app.post("/todos", async (req, res) => {
  const body = req.body ?? {};
  const text = body.title ?? body.text ?? "Empty todo";

  const todo = await prisma.todo.create({
    data: {
      completed: false,
      createdAt: new Date(),
      text,
    },
  });

  return res.json({ ...todo, title: todo.text });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) return res.status(404).json({ error: "Not found" });
  return res.json({ ...todo, title: todo.text });
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body ?? {};
  const data: any = { ...body };
  if (body.title !== undefined) {
    data.text = body.title;
    delete data.title;
  }

  const todo = await prisma.todo.update({
    where: { id },
    data,
  });

  return res.json({ ...todo, title: todo.text });
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.todo.delete({
    where: { id },
  });

  return res.send({ status: "ok" });
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /todos
    GET, PUT, DELETE /todos/:id
  </pre>
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
