import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  if (!name || !email || !password)
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
