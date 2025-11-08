const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.examResult.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.content.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

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

  // Create Courses
  const courses = [
    {
      title: 'Dasar-dasar Ninjutsu',
      rankLevel: 'Genin',
      description: 'Pelajari fundamental teknik ninjutsu dari dasar. Kursus ini dirancang khusus untuk ninja pemula yang ingin memahami chakra, hand seals, dan teknik-teknik dasar.',
      duration: '4 jam',
      modules: 12,
      price: 0
    },
    {
      title: 'Genjutsu untuk Pemula',
      rankLevel: 'Genin',
      description: 'Menguasai seni ilusi ninja. Pelajari cara membuat dan mendeteksi genjutsu dasar untuk pertempuran.',
      duration: '3 jam',
      modules: 8,
      price: 0
    },
    {
      title: 'Teknik Chakra Control',
      rankLevel: 'Chunin',
      description: 'Tingkatkan kemampuan kontrol chakra-mu. Pelajari teknik-teknik advanced untuk efisiensi chakra maksimal.',
      duration: '5 jam',
      modules: 15,
      price: 0
    }
  ];

  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: courseData
    });

    // Create contents for each course
    for (let i = 1; i <= courseData.modules; i++) {
      await prisma.content.create({
        data: {
          courseId: course.id,
          title: `Modul ${i}: ${courseData.title}`,
          type: i % 3 === 0 ? 'quiz' : 'video',
          url: `https://example.com/video/${course.id}/${i}`,
          body: `Konten untuk modul ${i} dari kursus ${courseData.title}`,
          order: i
        }
      });
    }

    console.log(`✅ Created course: ${course.title}`);
  }

  // Create Enrollments for student1
  const allCourses = await prisma.course.findMany();
  
  // Enroll student1 to first 2 courses
  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: allCourses[0].id
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: allCourses[1].id
    }
  });

  console.log('✅ Created enrollments');

  // Create Progress for student1
  await prisma.progress.create({
    data: {
      userId: student1.id,
      courseId: allCourses[0].id,
      percent: 75.00
    }
  });

  await prisma.progress.create({
    data: {
      userId: student1.id,
      courseId: allCourses[1].id,
      percent: 45.00
    }
  });

  console.log('✅ Created progress records');

  // Create Certificate for student1 (completed course)
  await prisma.certificate.create({
    data: {
      userId: student1.id,
      courseId: allCourses[0].id,
      certificateNumber: 'KNH-2025-001-GEN'
    }
  });

  console.log('✅ Created certificate');

  console.log('\n🎉 Database seeding completed successfully!');
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