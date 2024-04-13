"use server";
import { User, userSchema } from "@/lib/zod-schemas";
import prisma from "@/lib/db";

export async function createNewUser(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const parse = userSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log(parse);
  if (!parse.success) {
    return { message: "Parse failed." };
  }

  const {
    email,
    firstName,
    lastName,
    password: unhashedPwd,
  }: User = parse.data;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: unhashedPwd,
        firstName,
        lastName,
      },
    });

    return { message: `created user ${firstName}`, username: email };
  } catch (e) {
    console.log(e);
    return { message: "Failed to create user", username: "" };
  }
}
