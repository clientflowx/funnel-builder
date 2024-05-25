import { formField } from "@/./types/formField";

const settingsFormFields: formField[] = [
  {
    value: "name",
    label: "Name",
    type: "text",
  },
  {
    value: "path",
    label: "Path",
    type: "text",
  },
  {
    value: "head-tracking-code",
    label: "Head tracking code",
    type: "text",
  },
  {
    value: "domain",
    label: "Domain",
    type: "text",
  },
  {
    value: "favicon-url",
    label: "Favicon URL",
    type: "text",
  },
  {
    value: "body-tracking-code",
    label: "Body tracking code",
    type: "text",
  },
];

export { settingsFormFields };
