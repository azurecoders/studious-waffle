"use client";

import { CreateUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  authStart,
  authSuccess,
  authFailure,
} from "@/lib/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegistrationPage = () => {
  const loading = useAppSelector((state) => state.loading);
  const user = useAppSelector((state) => state.user);
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user.id !== "") {
      router.push("/");
    }
  }, [user.id, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      userType,
      ...formData,
    };
    try {
      dispatch(authStart());
      const response = await CreateUserAction(data);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch(authSuccess(response.user));
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        dispatch(authFailure());
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(authFailure());
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-[#1E1E1E] to-[#121212] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
              Join Mazdory
            </h1>
            <p className="mt-2 text-gray-400">
              Connect with opportunities worldwide
            </p>
          </div>

          <Card className="shadow-xl bg-[#2C2C2C] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Create your account</CardTitle>
              <CardDescription className="text-gray-400">
                Start your journey with Mazdory today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-gray-300">
                    I want to
                  </Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger
                      id="userType"
                      className="w-full bg-[#1E1E1E] border-gray-700 text-gray-100"
                    >
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2C2C2C] border-gray-800">
                      <SelectItem
                        value="worker"
                        className="text-gray-300 hover:bg-[#1E1E1E]"
                      >
                        Find Work
                      </SelectItem>
                      <SelectItem
                        value="contractor"
                        className="text-gray-300 hover:bg-[#1E1E1E]"
                      >
                        Hire Talent
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="w-full bg-[#1E1E1E] border-gray-700 text-gray-100 focus:border-orange-500"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#1E1E1E] border-gray-700 text-gray-100 focus:border-orange-500"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full pr-10 bg-[#1E1E1E] border-gray-700 text-gray-100 focus:border-orange-500"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 group"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <>
                      {"Create Account"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-orange-400 hover:text-orange-500 font-medium"
                  >
                    Log in
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
