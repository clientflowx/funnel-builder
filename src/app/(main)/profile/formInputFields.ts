import { formField } from "./types"


const updateProfileFormFields: formField[] = [
    {
        label: "Avatar",
        type: "file"
    },
    {
        label: "Email Address",
        type: "email"
    },
    {
        label: "First Name",
        type: "text"
    },
    {
        label: "Last Name",
        type: "text"
    },
    {
        label: "Your Time Zone",
        type: "text"
    },
]

const updatePasswordFormFields: formField[] = [
    {
        label: "Current Password",
        type: "text"
    },
    {
        label: "New Password",
        type: "text"
    },
    {
        label: "Confirm Password",
        type: "text"
    },
]


export { updateProfileFormFields, updatePasswordFormFields };