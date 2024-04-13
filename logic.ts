import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// User registration
async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });
  return user;
}

// User login
async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
}

// Create an investment account
async function createInvestmentAccount(
  userId: number,
  investmentPlanId: number,
  amount: number
) {
  const investmentPlan = await prisma.investmentPlan.findUnique({
    where: { id: investmentPlanId },
  });
  if (!investmentPlan) {
    throw new Error("Invalid investment plan");
  }

  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + investmentPlan.duration * 24 * 60 * 60 * 1000
  );
  const expectedProfit = (amount * investmentPlan.interestRate) / 100;

  const investmentAccount = await prisma.investmentAccount.create({
    data: {
      userId,
      investmentPlanId,
      amount,
      startDate,
      endDate,
      expectedProfit,
      status: "active",
    },
  });

  return investmentAccount;
}

// Get investment account details
async function getInvestmentAccountDetails(accountId: number) {
  const investmentAccount = await prisma.investmentAccount.findUnique({
    where: { id: accountId },
    include: {
      user: true,
      investmentPlan: true,
    },
  });

  if (!investmentAccount) {
    throw new Error("Investment account not found");
  }

  return investmentAccount;
}

// Complete an investment account
async function completeInvestmentAccount(accountId: number) {
  const investmentAccount = await prisma.investmentAccount.findUnique({
    where: { id: accountId },
  });
  if (!investmentAccount) {
    throw new Error("Investment account not found");
  }

  if (investmentAccount.status !== "active") {
    throw new Error("Investment account is not active");
  }

  const updatedInvestmentAccount = await prisma.investmentAccount.update({
    where: { id: accountId },
    data: {
      status: "completed",
    },
  });

  return updatedInvestmentAccount;
}

// Example usage
async function main() {
  // Register a new user
  const newUser = await registerUser(
    "example@email.com",
    "password123",
    "John",
    "Doe"
  );
  console.log("New user registered:", newUser);

  // Login user
  const loggedInUser = await loginUser("example@email.com", "password123");
  console.log("User logged in:", loggedInUser);

  // Create an investment account
  const investmentAccount = await createInvestmentAccount(
    loggedInUser.id,
    1,
    50000
  );
  console.log("Investment account created:", investmentAccount);

  // Get investment account details
  const accountDetails = await getInvestmentAccountDetails(
    investmentAccount.id
  );
  console.log("Investment account details:", accountDetails);

  // Complete an investment account
  const completedAccount = await completeInvestmentAccount(
    investmentAccount.id
  );
  console.log("Investment account completed:", completedAccount);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
