/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import { changePassword, getUserProfile, updateProfile, updateProfileImage, } from "@/services/Dashboard/profile.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { TravelInterestSelect } from "@/components/Shared/TravelInterestSelect";




const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  fullName: z.string().min(2, "Full Name must be at least 2 characters").optional(),
  email: z.email("Invalid email address").optional(),
  currentLocation: z.string().optional(),
  bio: z.string().optional(),
  travelInterests: z.string().array().optional(),
  visitedCountries: z.string().array().optional()
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const options = useMemo(() => countryList().getData(), []);


  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
  });

  const passForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const result = await getUserProfile();

      if (result && result.success && result.data) {
        const userData = result.data;
        setUser(userData);

        profileForm.reset({
          name: userData.name || "",
          fullName: userData.fullName || "",
          email: userData.email || "",
          currentLocation: userData.location || "",
          bio: userData.bio || "",
          travelInterests: userData.travelInterests || [],
          visitedCountries: userData.visitedCountries || [],
        });
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [profileForm]);

  const saveProfile = async (values: any) => {
    setIsLoading(true);
    const res = await updateProfile(values);
    setIsLoading(false);

    if (res.success) {
      toast.success("Profile updated successfully");
      setUser(res.data);
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsLoading(true);
    const fd = new FormData();
    fd.append("profileImage", file);

    const res = await updateProfileImage(fd);
    setIsLoading(false);

    if (res.success) {
      setUser(res.data);
      toast.success("Profile picture updated successfully");
    } else {
      toast.error("Failed to upload image");
    }
  };

  const handlePassword = async (values: any) => {
    setIsLoading(true);
    const res = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    setIsLoading(false);

    if (res.success) {
      toast.success("Password changed successfully");
      passForm.reset();
    } else {
      toast.error(res.message || "Failed to change password");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div >
        <LoaderIcon className="animate-spin repeat-infinite"></LoaderIcon>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and account preferences</p>
        </div>

        {/* Profile Picture Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
            <CardDescription>Upload a new profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <div className="relative">
              <Image
                src={user.profileImage || ""}
                alt="Profile Image"
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-primary/10"
              />
            </div>
            <div className="text-sm font-medium">{user?.fullName?.toUpperCase() || ""}</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleImage}
                accept="image/*"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                disabled={isLoading}
                onClick={(e) => {
                  e.currentTarget.parentElement?.querySelector("input")?.click();
                }}
              >
                {isLoading ? "Uploading..." : "Change Picture"}
              </Button>
            </label>
            <CardContent className="space-y-3 text-center">

              <div className="text-sm text-muted-foreground">{user?.bio || "No bio provided"}</div>
            </CardContent>
          </CardContent>
        </Card>

        {/* Tabs for Profile and Password */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={profileForm.handleSubmit(saveProfile)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <Input
                        placeholder="Enter your name"
                        {...profileForm.register("fullName")}
                        className="w-full"
                      />
                      {profileForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <Input
                        placeholder="Enter your name"
                        {...profileForm.register("name")}
                        className="w-full"
                      />
                      {profileForm.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...profileForm.register("email")}
                        className="w-full"
                      />
                      {profileForm.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input
                      placeholder="Enter your currentLocation"
                      {...profileForm.register("currentLocation")}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      placeholder="Tell us about yourself"
                      className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={4}
                      {...profileForm.register("bio")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      travel Interests
                    </label>
                    <Controller
                      control={profileForm.control}
                      name="travelInterests"
                      render={({ field }) => (
                        <TravelInterestSelect
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <Controller
                    control={profileForm.control}
                    name="visitedCountries"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={options}
                        isMulti
                        placeholder="Select countries"
                        value={options.filter(opt =>
                          field.value?.includes(opt.value)
                        )}
                        onChange={(selected) =>
                          field.onChange(selected.map(item => item.value))
                        }
                      />
                    )}
                  />


                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={passForm.handleSubmit(handlePassword)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <Input
                      placeholder="Enter your current password"
                      type="password"
                      {...passForm.register("oldPassword")}
                      className="w-full"
                    />
                    {passForm.formState.errors.oldPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passForm.formState.errors.oldPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <Input
                      placeholder="Enter your new password"
                      type="password"
                      {...passForm.register("newPassword")}
                      className="w-full"
                    />
                    {passForm.formState.errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <Input
                      placeholder="Confirm your new password"
                      type="password"
                      {...passForm.register("confirmPassword")}
                      className="w-full"
                    />
                    {passForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {passForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
