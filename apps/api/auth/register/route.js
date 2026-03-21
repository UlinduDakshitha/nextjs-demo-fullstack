// app/api/auth/register/route.js

import sequelize from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { message: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      return Response.json({ message: "Invalid email" }, { status: 400 });
    }

    if (String(password).length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    await sequelize.sync();

    const exist = await User.findOne({ where: { email: normalizedEmail } });

    if (exist) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(String(password), 10);

    await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashed,
    });

    return Response.json({ message: "Registered" }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
