const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding User Service...');

  // Clear existing data
  await prisma.user.deleteMany();

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Konoha',
      email: 'admin@konoha.com',
      passwordHash: adminPassword,
      role: 'admin',
      ninjaRank: 'Hokage'
    }
  });
  console.log('✅ Created admin user:', admin.email);

  // Create Test Users
  const studentPassword = await bcrypt.hash('student123', 10);
  
  const student1 = await prisma.user.create({
    data: {
      name: 'Naruto Uzumaki',
      email: 'naruto@konoha.com',
      passwordHash: studentPassword,
      role: 'student',
      ninjaRank: 'Genin'
    }
  });

  const student2 = await prisma.user.create({
    data: {
      name: 'Sasuke Uchiha',
      email: 'sasuke@konoha.com',
      passwordHash: studentPassword,
      role: 'student',
      ninjaRank: 'Chunin'
    }
  });

  console.log('✅ Created test users');
  console.log('\n📋 Test Credentials:');
  console.log('Admin: admin@konoha.com / admin123');
  console.log('Student 1: naruto@konoha.com / student123');
  console.log('Student 2: sasuke@konoha.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });