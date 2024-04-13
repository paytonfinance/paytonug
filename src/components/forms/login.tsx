"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNewUser } from "@/actions/create-user";
import { useFormState } from "react-dom";
import { signIn } from "../../../auth";

let initialState = {
  message: "",
};

export async function LoginForm() {
  const [state, formAction] = useFormState(createNewUser, initialState);
  console.log(state);
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  return (
    <form className="grid gap-4" action={formAction}>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" placeholder="Max" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" placeholder="Robinson" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" className="w-full">
        Create an account
      </Button>
    </form>
  );
}
