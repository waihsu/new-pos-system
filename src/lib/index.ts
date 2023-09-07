import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// let prismaClient: PrismaClient;

// // Create a function to initialize Prisma Client
// export const initializePrisma = (): PrismaClient => {
//   if (!prismaClient) {
//     prismaClient = new PrismaClient();
//   }
//   return prismaClient;
// };
