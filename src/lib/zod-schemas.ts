import * as z from "zod";

export const investmentStatusEnum = z.enum([
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);
export const transactionTypeEnum = z.enum([
  "DEPOSIT",
  "WITHDRAWAL",
  "INVESTMENT",
  "PROFIT",
]);

export const userSchema = z.object({
  id: z.number().int().positive().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const accountSchema = z.object({
  id: z.number().int().positive().optional(),
  userId: z.number().int().positive("User ID must be a positive integer"),
  balance: z.number().nonnegative("Balance cannot be negative").optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const investmentPlanSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, "Investment plan name is required"),
  description: z.string().optional().nullable(),
  duration: z.number().int().positive("Duration must be a positive integer"),
  interestRate: z.number().nonnegative("Interest rate cannot be negative"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const investmentSchema = z.object({
  id: z.number().int().positive().optional(),
  accountId: z.number().int().positive("Account ID must be a positive integer"),
  planId: z
    .number()
    .int()
    .positive("Investment plan ID must be a positive integer"),
  amount: z.number().positive("Investment amount must be positive"),
  startDate: z.string().datetime("Invalid start date"),
  endDate: z.string().datetime("Invalid end date"),
  expectedProfit: z.number().nonnegative("Expected profit cannot be negative"),
  status: investmentStatusEnum.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const transactionSchema = z.object({
  id: z.number().int().positive().optional(),
  accountId: z.number().int().positive("Account ID must be a positive integer"),
  // type: transactionTypeEnum("Invalid transaction type"),
  amount: z.number().nonnegative("Transaction amount cannot be negative"),
  description: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const userActivitySchema = z.object({
  id: z.number().int().positive().optional(),
  userId: z.number().int().positive("User ID must be a positive integer"),
  action: z.string().min(1, "Activity action is required"),
  context: z.any().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const schemas = {
  user: userSchema,
  account: accountSchema,
  investmentPlan: investmentPlanSchema,
  investment: investmentSchema,
  transaction: transactionSchema,
  userActivity: userActivitySchema,
};

export type User = z.infer<typeof userSchema>;
export type Account = z.infer<typeof accountSchema>;
export type InvestmentPlan = z.infer<typeof investmentPlanSchema>;
export type Investment = z.infer<typeof investmentSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type UserActivity = z.infer<typeof userActivitySchema>;
