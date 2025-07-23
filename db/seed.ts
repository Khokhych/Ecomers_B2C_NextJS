import { prisma } from "../lib/prisma";
import sampleData from "./sample-data";

async function main() {

  try {
    // Delete existing products
    await prisma.product.deleteMany();

    // Create new products
    await prisma.product.createMany({
      data: sampleData.products,
    });

    console.log("Database seeded with sample data");
    console.log(`Created ${sampleData.products.length} products`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});