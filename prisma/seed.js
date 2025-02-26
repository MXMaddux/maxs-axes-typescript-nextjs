const { PrismaClient } = require("@prisma/client");
const guitars = require("./guitars.json");
const prisma = new PrismaClient();

async function main() {
  for (const guitar of guitars) {
    await prisma.guitar.create({
      data: guitar,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
