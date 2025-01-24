"use client";

import { logOut } from "@/lib/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const ProfileVerifier = ({ device }: { device: string }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
  };

  return (
    <>
      {device === "desktop" ? (
        <>
          {user.id === "" ? (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link href="/register">
                <Button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              {user.userType === "worker" ? (
                <Link href="/find-work">
                  <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 py-2 px-4 rounded-md">
                    Find Work
                  </button>
                </Link>
              ) : (
                <Link href="/post-work">
                  <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 py-2 px-4 rounded-md flex items-center gap-2">
                    <Plus size={20} />
                    Post Work
                  </button>
                </Link>
              )}
              <Link href="/profile">
                <img
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
              <button
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 py-2 px-4 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {user.id === "" ? (
            <>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 mb-3 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 py-2 px-4">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 py-2 px-4 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProfileVerifier;
