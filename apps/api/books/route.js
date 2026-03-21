// app/api/books/route.js
import Book from "@/models/Book";
import sequelize from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  await sequelize.sync();
  const books = await Book.findAll();
  return Response.json(books);
}

export async function POST(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return Response.json({ message: "No token" }, { status: 401 });

  verifyToken(token);

  const { title, author } = await req.json();

  const book = await Book.create({ title, author });

  return Response.json(book);
}