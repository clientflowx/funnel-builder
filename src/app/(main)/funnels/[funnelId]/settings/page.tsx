"use client";
import React from "react";
import { settingsFormFields } from "./formInputFields";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const settingsFieldsColumn1 = settingsFormFields.slice(
    0,
    Math.ceil(settingsFormFields.length / 2)
  );
  const settingsFieldsColumn2 = settingsFormFields.slice(
    Math.ceil(settingsFormFields.length / 2)
  );
  return (
    <div className="flex w-full gap-4 text-sm">
      <div className="w-full flex flex-col gap-3">
        {settingsFieldsColumn1.map((field, index) => (
          <div key={index} className="grid w-full items-center gap-2">
            <Label htmlFor="">{field.label}</Label>
            <Input
              className="w-full"
              type={field.type}
              // value={updateForm[field.value as keyof typeof updateForm]}
              // onChange={(e) => handleUpdateProfileFormChange(e, field)}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-3">
        {settingsFieldsColumn2.map((field, index) => (
          <div key={index} className="grid w-full items-center gap-2">
            <Label htmlFor="">{field.label}</Label>
            <Input
              className="w-full"
              type={field.type}
              // value={updateForm[field.value as keyof typeof updateForm]}
              // onChange={(e) => handleUpdateProfileFormChange(e, field)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
