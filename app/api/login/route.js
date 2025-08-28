import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    }),
    { status: 200 }
  );
}
