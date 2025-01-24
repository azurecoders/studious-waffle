"use client";

import { SubmitVerificationAction } from "@/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/lib/store/hooks";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Shield, X } from "lucide-react";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface VerificationData {
  fullName: string;
  cnicFront: string;
  cnicBack: string;
}

const VerificationPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<VerificationData>({
    fullName: "",
    cnicFront: "",
    cnicBack: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const handleVerification = async () => {
    setLoading(true);
    try {
      const response = await SubmitVerificationAction({
        userId: user.id,
        name: formData.fullName,
        frontUrl: formData.cnicFront,
        backUrl: formData.cnicBack,
      });
      if (response.success) {
        toast.success(response.message);
        setSuccess(response.message);
        setFormData({
          fullName: "",
          cnicFront: "",
          cnicBack: "",
        });
      } else {
        toast.error(response.message);
        setError(response.message);
      }
    } catch (error: Error | any) {
      toast.error(error.messag);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto"
          >
            <Shield className="w-8 h-8 text-orange-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">
            Account Verification
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Please provide your CNIC details for account verification. This
            helps us maintain a secure and trusted platform for all users.
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <Alert className="bg-red-500/10 text-red-400 border-red-500/50">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-500/10 text-green-400 border-green-500/50 flex items-center">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Main Form */}
        <Card className="border-2 border-orange-500/20 bg-zinc-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-orange-400">
              Verification Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleVerification} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-zinc-800 border-orange-500/30 text-white focus:ring-orange-500/30 focus:border-orange-500"
                  placeholder="Enter your full name as per CNIC"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cnicFront" className="text-white">
                    CNIC Front URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="cnicFront"
                      name="cnicFront"
                      value={formData.cnicFront}
                      onChange={handleChange}
                      className="bg-zinc-800 border-orange-500/30 text-white focus:ring-orange-500/30 focus:border-orange-500"
                      placeholder="Enter front side image URL"
                    />
                    {formData.cnicFront && (
                      <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border-2 border-orange-500/30">
                        <img
                          src={formData.cnicFront}
                          alt="CNIC Front"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x400?text=Invalid+Image+URL";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnicBack" className="text-white">
                    CNIC Back URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="cnicBack"
                      name="cnicBack"
                      value={formData.cnicBack}
                      onChange={handleChange}
                      className="bg-zinc-800 border-orange-500/30 text-white focus:ring-orange-500/30 focus:border-orange-500"
                      placeholder="Enter back side image URL"
                    />
                    {formData.cnicBack && (
                      <div className="mt-2 relative aspect-video rounded-lg overflow-hidden border-2 border-orange-500/30">
                        <img
                          src={formData.cnicBack}
                          alt="CNIC Back"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x400?text=Invalid+Image+URL";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-orange-700 hover:to-red-600 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines Card */}
        <Card className="border-2 border-orange-500/20 bg-zinc-900/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">
                  Verification Guidelines
                </h3>
                <ul className="text-gray-400 space-y-2 text-sm list-disc pl-0 md:pl-4">
                  <li>Ensure both sides of CNIC are clearly visible</li>
                  <li>Make sure the image URLs are accessible and valid</li>
                  <li>Images should be well-lit and in focus</li>
                  <li>All corners of the CNIC should be visible</li>
                  <li>Full name should match exactly as written on CNIC</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerificationPage;
