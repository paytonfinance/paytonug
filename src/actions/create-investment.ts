"use server";
import * as schemas from "../lib/zod-schemas";
import prisma from "../lib/db";

const investmentSchema = schemas.investmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

export async function createInvestment(
  prevState: { message: "" },
  formData: FormData
) {
  const validationResult = investmentSchema.safeParse({
    accountId: formData.get("accountId"),
    amount: formData.get("amount"),
    planId: formData.get("planId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    expectedProfit: formData.get("expectedProfit"),
  });

  if (!validationResult.success) {
    return validationResult.error.formErrors.fieldErrors;
  }

  const {
    accountId,
    planId,
    amount,
    startDate,
    endDate,
    expectedProfit,
  }: schemas.Investment = validationResult.data;

  try {
    const plan = await prisma.investmentPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return { error: "Invalid investment plan" };
    }

    const investment = await prisma.investment.create({
      data: {
        accountId,
        planId,
        amount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        expectedProfit,
      },
    });

    return { data: investment };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
}

`
1. Get use input
  investment plan
  userId
2. create investment
3. return return 

`;
