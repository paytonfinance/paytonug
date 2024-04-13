"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvestment } from "@/actions/create-investment";
import { investmentSchema } from "@/lib/zod-schemas";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function InvestForm() {
  const [state, formAction] = useFormState(createInvestment, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(investmentSchema),
  });

  const onSubmit = async (data: unknown) => {
    const result = await createInvestment(data);
    if ("error" in result) {
      console.error(result.error);
    } else {
      console.log(result.investment);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button type="submit">Create Investment</button>
    </form>
  );
}
