// app/api/books/[id]/route.js
import Book from "@/models/Book";
import { verifyToken } from "@/lib/auth";

export async function GET(req, { params }) {
  const book = await Book.findByPk(params.id);
  return Response.json(book);
}

export async function PUT(req, { params }) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  verifyToken(token);

  const { title, author } = await req.json();

  const book = await Book.findByPk(params.id);
  await book.update({ title, author });

  return Response.json(book);
}

export async function DELETE(req, { params }) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  verifyToken(token);

  const book = await Book.findByPk(params.id);
  await book.destroy();

  return Response.json({ message: "Deleted" });
}