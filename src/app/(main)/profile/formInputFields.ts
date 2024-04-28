import { formField } from "@/./types/formField";

const updateProfileFormFields: formField[] = [
  {
    value: "avatar",
    label: "Avatar",
    type: "file",
  },
  {
    value: "email",
    label: "Email Address",
    type: "email",
  },
  {
    value: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    value: "lastName",
    label: "Last Name",
    type: "text",
  },
];

const updatePasswordFormFields: formField[] = [
  {
    value: "currentPassword",
    label: "Current Password",
    type: "text",
  },
  {
    value: "newPassword",
    label: "New Password",
    type: "text",
  },
  {
    value: "confirmPassword",
    label: "Confirm Password",
    type: "text",
  },
];

export { updateProfileFormFields, updatePasswordFormFields };
