import { z } from "zod";

export const profileSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),

  // Security
  oldPassword: z.string().min(6, "Old password required"),
  newPassword: z.string().min(6, "Password must be 6+ chars"),
  confirmPassword: z.string().min(6, "Confirm your password"),

  // Notifications
  notifyEmail: z.boolean().default(false),
  notifySMS: z.boolean().default(false),
  notifyPush: z.boolean().default(false),

  // Uploads
  profileImage: z
    .any()
    .refine((file) => file?.length > 0, "Profile image required"),
  resume: z
    .any()
    .refine((file) => file?.length > 0, "Resume file required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
