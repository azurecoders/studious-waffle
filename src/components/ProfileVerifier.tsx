"use client";

import { logOut } from "@/lib/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { Button } from "./ui/button";

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
              <Button
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20"
                onClick={handleLogout}
              >
                Logout
              </Button>
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
                <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 mb-3">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProfileVerifier;
