"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, MapPin, PhoneCall, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/lib/store/hooks";
import { FetchUserDataAction, UpdateUserAction } from "@/actions";
import { Toaster, toast } from "react-hot-toast";

const ProfilePage = () => {
  const user = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    country: "Pakistan",
    province: "",
    area: "",
    profilePicture: "",
    userType: "worker",
    bio: "",
    skills: [],
    rate: {
      rateType: "Hourly",
      rate: 0,
    },
  });
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    country: "Pakistan",
    province: "",
    area: "",
    profilePicture: "",
    userType: "worker",
    bio: "",
    skills: [],
    rate: {
      rateType: "Hourly",
      rate: 0,
    },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user.id) return;
      const response = await FetchUserDataAction(user.id.toString());
      if (response.success) {
        setFormData(response.userData!);
        setEditedUser(response.userData!);
      }
    };
    fetchUserDetails();
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]:
        name === "skills"
          ? value.split(",").map((skill) => skill.trim())
          : value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await UpdateUserAction(editedUser);
      if (response.success) {
        toast.success(response.message);
        setFormData(editedUser);
        setIsOpen(null);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="w-full shadow-2xl border-2 border-orange-500/20 rounded-2xl overflow-hidden bg-zinc-900">
          <CardHeader className="bg-gradient-to-r from-black to-zinc-900 text-white border-b-2 border-orange-500/30">
            <div className="flex justify-between items-center flex-wrap space-y-2">
              <CardTitle className="text-2xl font-bold text-orange-400">
                Professional Profile
              </CardTitle>
              <Button
                variant="outline"
                className="bg-transparent text-orange-400 hover:bg-orange-500/10 border-orange-500/30"
                onClick={() => setIsOpen(user?.id)}
              >
                <Edit className="mr-2 w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-8 bg-zinc-900 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative group">
                <img
                  src={
                    formData?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile picture"
                  className="w-52 h-52 rounded-full object-cover border-4 border-orange-500/30 shadow-lg transition-transform group-hover:scale-105"
                />
              </div>

              {/* Profile Information */}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-orange-400 mb-1">
                    {formData?.name || "Name Not Set"}
                  </h2>
                  <p className="text-orange-300 font-medium">
                    {formData?.userType === "worker" ? "Worker" : "Client"}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-gray-300 leading-relaxed">
                  {formData?.bio || "No bio available"}
                </p>

                {/* Contact & Location Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-400">
                    <MapPin className="mr-2 w-5 h-5 text-orange-500" />
                    <span>
                      {formData?.area || "Location"},{" "}
                      {formData?.province || "Province"}, {formData?.country}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <PhoneCall className="mr-2 w-5 h-5 text-orange-500" />
                    <span>{formData?.phoneNumber || "Not provided"}</span>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData?.skills && formData.skills.length > 0 ? (
                      formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No skills added</span>
                    )}
                  </div>
                </div>

                {/* Rates Section */}
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-3">
                    Rates
                  </h3>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-orange-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">
                        {formData?.rate.rateType}
                      </span>
                      <span className="text-orange-400 font-bold text-xl">
                        {formData?.rate.rate > 0
                          ? `PKR. ${formData.rate.rate}`
                          : "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Modal */}
        <Dialog
          open={isOpen !== null}
          onOpenChange={() => {
            setIsOpen(null);
          }}
        >
          <DialogContent className="sm:max-w-[700px] h-full md:max-h-[80vh] overflow-y-scroll bg-zinc-900 border-2 border-orange-500/30">
            <DialogHeader>
              <DialogTitle className="text-orange-400 text-2xl">
                Edit Profile
              </DialogTitle>
            </DialogHeader>
            <form
              action={handleUpdateUser}
              className="grid gap-6 py-4 text-white"
            >
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={
                      editedUser?.profilePicture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-orange-500/30"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-gray-300">Profile Picture URL</label>
                  <Input
                    name="profilePicture"
                    placeholder="Enter profile picture URL"
                    onChange={handleInputChange}
                    value={editedUser.profilePicture}
                    type="text"
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-300">Name</label>
                  <Input
                    placeholder="Your full name"
                    name="name"
                    onChange={handleInputChange}
                    type="text"
                    value={editedUser.name}
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300">Email</label>
                  <Input
                    placeholder="Your email address"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={editedUser.email}
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-gray-300">Bio</label>
                <Textarea
                  placeholder="Tell us about yourself"
                  rows={4}
                  onChange={handleInputChange}
                  name="bio"
                  value={editedUser.bio}
                  className="bg-zinc-800 border-orange-500/30 text-white"
                />
              </div>

              {/* Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-300">Rate Type</label>
                  <Select
                    value={editedUser.rate.rateType}
                    onValueChange={(value) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        rate: {
                          ...prev.rate,
                          rateType: value === "Hourly" ? "Hourly" : "Daily",
                        },
                      }))
                    }
                  >
                    <SelectTrigger className="bg-zinc-800 border-orange-500/30 text-white">
                      <SelectValue placeholder="Select Rate Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-orange-500/30">
                      <SelectItem
                        value="Hourly"
                        className="text-white hover:bg-orange-500/10"
                      >
                        Hourly
                      </SelectItem>
                      <SelectItem
                        value="Daily"
                        className="text-white hover:bg-orange-500/10"
                      >
                        Daily
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300">Rate Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter rate amount"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        rate: {
                          ...prev.rate,
                          rate: +e.target.value,
                        },
                      }))
                    }
                    value={editedUser.rate.rate}
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-gray-300">Country</label>
                  <Input
                    placeholder="Country"
                    name="country"
                    type="text"
                    value={"Pakistan"}
                    readOnly
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300">Province</label>
                  <Input
                    placeholder="Province/State"
                    onChange={handleInputChange}
                    name="province"
                    type="text"
                    value={editedUser.province}
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-300">Area</label>
                  <Input
                    placeholder="City/Area"
                    onChange={handleInputChange}
                    name="area"
                    type="text"
                    value={editedUser.area}
                    className="bg-zinc-800 border-orange-500/30 text-white"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="text-gray-300">Skills</label>
                <Input
                  placeholder="Enter skills separated by commas"
                  onChange={handleInputChange}
                  type="text"
                  name="skills"
                  value={editedUser.skills ? editedUser.skills.join(", ") : ""}
                  className="bg-zinc-800 border-orange-500/30 text-white"
                />
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <label className="text-gray-300">Phone Number</label>
                <Input
                  placeholder="Your phone number"
                  type="tel"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  value={editedUser.phoneNumber}
                  className="bg-zinc-800 border-orange-500/30 text-white"
                />
              </div>
              <DialogFooter>
                <Button
                  type="reset"
                  variant="outline"
                  className="text-orange-400 border-orange-500/30 hover:bg-orange-500/10"
                  onClick={() => setIsOpen(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-700 hover:to-red-600"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
