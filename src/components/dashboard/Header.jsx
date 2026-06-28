import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import LogoutButton from "../auth/LogoutButton";

import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
  const [username, setUsername] = useState("Guest");

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [user]);

  const avatar = username.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#30363D] bg-[#0D1117]/90 px-8 py-5 backdrop-blur-xl">

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          placeholder="Search..."
          className="w-96 rounded-xl border border-[#30363D] bg-[#161B22] py-3 pl-11 pr-4 text-white outline-none transition focus:border-green-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <Bell
          size={22}
          className="cursor-pointer text-gray-400 transition hover:text-white"
        />

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 font-bold text-white shadow-lg">
            {avatar}
          </div>

          <div className="hidden md:block">

            <p className="text-sm font-semibold text-white">
              {username}
            </p>

            <p className="text-xs text-gray-400">
              Community Member
            </p>

          </div>

        </div>

        <LogoutButton />

      </div>

    </header>
  );
}