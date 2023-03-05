import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Field is required"),
});

export const addEmployeeSchema = yup.object({
  firstName: yup.string().required("Field is required"),
  lastName: yup.string().required("Field is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Field is required"),
  contactNumber: yup
    .string()
    .max(11, "Contact Number must be at most 11 characters")
    .required("Field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Field is required"),
});

export const addCooperativeSchema = yup.object({
  firstName: yup.string().required("Field is required"),
  lastName: yup.string().required("Field is required"),
  cooperative: yup.string().required("Field is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Field is required"),
  contactNumber: yup
    .string()
    .max(11, "Contact Number must be at most 11 characters")
    .required("Field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Field is required"),
});
