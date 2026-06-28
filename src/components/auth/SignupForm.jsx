import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Leaf } from "lucide-react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create Authentication account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      // Save user details in Firestore
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          username: name,
          email: email,
          createdAt: serverTimestamp(),
        }
      );

      alert("Account created successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">

      {/* Header */}
      <div className="mb-8 flex flex-col items-center">

        <Leaf
          className="mb-4 text-green-400"
          size={42}
        />

        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-gray-400">
          Join EcoAudit
        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSignup}
        className="space-y-5"
      >

        {/* Username */}
        <div className="relative">

          <User
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-green-500"
            required
          />

        </div>

        {/* Email */}
        <div className="relative">

          <Mail
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-green-500"
            required
          />

        </div>

        {/* Password */}
        <div className="relative">

          <Lock
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none focus:border-green-500"
            required
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-green-500 py-4 font-semibold text-black transition hover:scale-105"
        >
          Create Account
        </button>

      </form>

      {/* Login Link */}
      <p className="mt-6 text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-400 hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  );
}   