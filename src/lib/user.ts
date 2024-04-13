import * as z from "zod";

export const userSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 8 characters long"),
  // confirmPassword: z
  //   .string()
  //   .min(8, "Confirm password must be at least 8 characters long"),
  //   dateOfBirth: z
  //     .date()
  //     .optional()
  //     .refine((val) => isValidDate(val!), "Invalid date of birth"),
  // termsAccepted: z.boolean().optional().default(false),
  // avatarUrl: z.string().url().optional(),
});

// Helper function to validate date of birth
// const isValidDate = (date: Date) => {
//   const currentDate = new Date();
//   const minDate = new Date(
//     currentDate.getFullYear() - 130,
//     currentDate.getMonth(),
//     currentDate.getDate()
//   );
//   const maxDate = new Date(
//     currentDate.getFullYear() - 13,
//     currentDate.getMonth(),
//     currentDate.getDate()
//   );
//   return date >= minDate && date <= maxDate;
// };

// Type for the user data
export type UserData = z.infer<typeof userSchema>;

// app/invest/page.tsx
