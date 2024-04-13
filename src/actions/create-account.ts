"use server";
import { Account, accountSchema } from "@/lib/zod-schemas";
import prisma from "@/lib/db";

const acctSchema = accountSchema.omit({
  balance: true,
  id: true,
  createdAt: true,
  updatedAt: true,
  investments: true,
  transactions: true,
});

export async function createAccount(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const parse = acctSchema.safeParse({
    userId: formData.get("userId"),
  });

  console.log(parse);
  if (!parse.success) {
    return { message: "Parse failed." };
  }

  const { userId }: Account = parse.data;

  try {
    const user = await prisma.account.create({
      data: {
        userId,
      },
    });

    return { message: `created user ${userId}`, username: userId };
  } catch (e) {
    console.log(e);
    return { message: "Failed to create user", username: "" };
  }
}
