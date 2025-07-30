import { prisma } from "../lib/prisma";
import sampleData from "./sample-data";

async function main() {
  try {
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({ data: sampleData.products });
    await prisma.user.createMany({ data: sampleData.users });

    console.log("Database seeded with sample data");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
