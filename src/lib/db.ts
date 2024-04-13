import { PrismaClient } from "@prisma/client";

// Define the global variable in a type-safe way
declare global {
  var prisma: PrismaClient | undefined;
}

// Check if the global variable is already defined
const prisma = global.prisma || new PrismaClient();

// If in development mode, assign the instance to the global variable
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
