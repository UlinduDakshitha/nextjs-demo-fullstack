// app/api/auth/login/route.js
// import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";


export async function POST(req) {
  const { email, password } = await req.json();

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return Response.json({ message: "Wrong password" }, { status: 401 });
  }

  const token = generateToken(user);

  return Response.json({ token });
}