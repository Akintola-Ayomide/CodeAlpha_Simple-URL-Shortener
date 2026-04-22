import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connection successful!');
    
    const count = await prisma.url.count();
    console.log(`Current URL count: ${count}`);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
