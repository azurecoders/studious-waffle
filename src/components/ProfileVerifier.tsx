"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/lib/store/features/user/userSlice";

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
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20">
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
