"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { formField } from "./types";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

import {
  updatePasswordFormFields,
  updateProfileFormFields,
} from "./formInputFields";

const initialPasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const initialUserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [updatePasswordFormData, setupdatePasswordFormData] = useState(
    initialPasswordFormData
  );
  const [updateForm, setUpdateForm] = useState(initialUserFormData);

  useEffect(() => {
    if (isLoaded && user) {
      setUpdateForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        image: user.imageUrl || "",
      });
    }
  }, [isLoaded, user]);

  const handleUpdateProfileFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: formField
  ) => {
    setUpdateForm((prevState) => ({
      ...prevState,
      [field.value]: e.target.value,
    }));
  };

  return (
    <div className="p-10 flex flex-col gap-5">
      <div className="text-xl font-semibold">Profile</div>
      <div className="flex items-start justify-between gap-4">
        <div className="shadow-sm border w-1/2 rounded-md">
          <div className="p-5">
            <h2 className="font-bold">Update your profile</h2>
            <p className="text-xs">
              You can update the email address where you will receive
              notifications and also update the way your name is displated.
            </p>
          </div>
          <hr />
          {/* Profile Update form */}
          <div className="p-5">
            {!isLoaded ? (
              // loading skeleton
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              // TODO: Replace with <Form>
              <form
                action=""
                className="flex flex-col gap-5 items-start justify-between"
              >
                {updateForm.image && (
                  <Image
                    src={updateForm.image}
                    alt="user-image"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
                {updateProfileFormFields.map((field) => (
                  <div key={field.value} className="grid w-full items-center gap-1.5">
                    <Label htmlFor="">{field.label}</Label>
                    <Input
                      className="w-full"
                      type={field.type}
                      value={updateForm[field.value as keyof typeof updateForm]}
                      onChange={(e) => handleUpdateProfileFormChange(e, field)}
                    />
                  </div>
                ))}
                <div>
                  <Button className="bg-black hover:bg-gray-800 transition-all">
                    Update profile
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="shadow-sm border w-1/2 rounded-md">
          <div className="p-5">
            <h2 className="font-bold">Update your password</h2>
          </div>
          <hr />
          <div className="p-5">
            <Button className="font-bold shadow-sm" variant="outline">
              Send password reset email
            </Button>
          </div>
          {/* Update password form */}
          <div className="p-5">
            <form
              action=""
              className="flex flex-col gap-5 items-start justify-between"
            >
              {updatePasswordFormFields.map((field) => (
                <div key={field.value} className="grid w-full items-center gap-1.5">
                  <Label htmlFor="">{field.label}</Label>
                  <Input id="" className="w-full" type={field.type} />
                </div>
              ))}
              <div>
                <Button className="bg-black hover:bg-gray-800 transition-all">
                  Update password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
