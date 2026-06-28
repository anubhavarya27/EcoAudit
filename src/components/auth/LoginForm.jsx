import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Leaf } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl p-8">

      <div className="mb-8 flex flex-col items-center">
        <Leaf className="mb-4 text-green-400" size={42} />

        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-400">
          Login to EcoAudit
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">

        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-green-500"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 text-gray-400" size={20} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-green-500 py-4 font-semibold text-black transition hover:scale-105"
        >
          Login
        </button>

      </form>

      <p className="mt-6 text-center text-gray-400">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-400 hover:underline">
          Sign Up
        </Link>
      </p>

    </div>
  );
}