"use client"; // 👈 required in App Router client components

import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router navigation

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.message);
        return;
      }

      alert(data.message);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto p-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>

      {/* 👇 Login Button */}
      <button
        type="button"
        onClick={handleLoginRedirect}
        className="bg-gray-600 text-white p-2 rounded"
      >
        Go to Login
      </button>
    </form>
  );
}
