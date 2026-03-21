import User from "@/models/User";
import sequelize from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    await sequelize.sync();

    const user = await User.findOne({
      where: { email: String(email).trim().toLowerCase() },
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(String(password), user.password);

    if (!valid) {
      return Response.json({ message: "Wrong password" }, { status: 401 });
    }

    const token = generateToken(user);

    return Response.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
