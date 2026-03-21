import Book from "@/models/Book";
import sequelize from "@/lib/db";
import { verifyToken } from "@/lib/auth";

const getBearerToken = (req) => req.headers.get("authorization")?.split(" ")[1];

export async function GET() {
  try {
    await sequelize.sync();
    const books = await Book.findAll({ order: [["id", "DESC"]] });
    return Response.json(books);
  } catch (error) {
    console.error("Books GET error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const token = getBearerToken(req);

    if (!token) {
      return Response.json({ message: "No token" }, { status: 401 });
    }

    verifyToken(token);

    const { title, author } = await req.json();

    if (!title || !author) {
      return Response.json(
        { message: "Title and author are required" },
        { status: 400 },
      );
    }

    await sequelize.sync();
    const book = await Book.create({
      title: String(title).trim(),
      author: String(author).trim(),
    });

    return Response.json(book, { status: 201 });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    console.error("Books POST error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
