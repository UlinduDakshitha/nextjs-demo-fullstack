import Book from "@/models/Book";
import sequelize from "@/lib/db";
import { verifyToken } from "@/lib/auth";

const getBearerToken = (req) => req.headers.get("authorization")?.split(" ")[1];

export async function GET(_req, { params }) {
  try {
    await sequelize.sync();
    const book = await Book.findByPk(params.id);

    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }

    return Response.json(book);
  } catch (error) {
    console.error("Book GET by id error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
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
    const book = await Book.findByPk(params.id);

    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }

    await book.update({
      title: String(title).trim(),
      author: String(author).trim(),
    });

    return Response.json(book);
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    console.error("Book PUT error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = getBearerToken(req);

    if (!token) {
      return Response.json({ message: "No token" }, { status: 401 });
    }

    verifyToken(token);

    await sequelize.sync();
    const book = await Book.findByPk(params.id);

    if (!book) {
      return Response.json({ message: "Book not found" }, { status: 404 });
    }

    await book.destroy();
    return Response.json({ message: "Deleted" });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return Response.json({ message: "Invalid token" }, { status: 401 });
    }

    console.error("Book DELETE error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
