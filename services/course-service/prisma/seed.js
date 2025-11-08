const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Course Service...');

  // Clear existing data
  await prisma.certificate.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.content.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.course.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Courses with detailed content
  const coursesData = [
    {
      title: 'Dasar-dasar Ninjutsu',
      rankLevel: 'Genin',
      description: 'Pelajari fundamental teknik ninjutsu dari dasar. Kursus ini dirancang khusus untuk ninja pemula yang ingin memahami chakra, hand seals, dan teknik-teknik dasar.',
      duration: '4 jam',
      modules: 12,
      price: 0,
      contents: [
        { title: 'Pengenalan Ninjutsu', type: 'video', order: 1 },
        { title: 'Chakra: Sumber Kekuatan Ninja', type: 'video', order: 2 },
        { title: 'Hand Seals Dasar (Part 1)', type: 'video', order: 3 },
        { title: 'Hand Seals Dasar (Part 2)', type: 'video', order: 4 },
        { title: 'Teknik Transformasi', type: 'video', order: 5 },
        { title: 'Teknik Substitusi', type: 'video', order: 6 },
        { title: 'Quiz: Teori Dasar Ninjutsu', type: 'quiz', order: 7 },
        { title: 'Latihan Praktik Hand Seals', type: 'practice', order: 8 },
        { title: 'Strategi Pertempuran Basic', type: 'video', order: 9 },
        { title: 'Stamina dan Ketahanan', type: 'video', order: 10 },
        { title: 'Ujian Akhir', type: 'exam', order: 11 },
        { title: 'Sertifikat Penyelesaian', type: 'certificate', order: 12 }
      ]
    },
    {
      title: 'Genjutsu untuk Pemula',
      rankLevel: 'Genin',
      description: 'Menguasai seni ilusi ninja. Pelajari cara membuat dan mendeteksi genjutsu dasar untuk pertempuran.',
      duration: '3 jam',
      modules: 8,
      price: 0,
      contents: [
        { title: 'Pengenalan Genjutsu', type: 'video', order: 1 },
        { title: 'Ilusi Visual Dasar', type: 'video', order: 2 },
        { title: 'Mendeteksi Genjutsu', type: 'video', order: 3 },
        { title: 'Quiz: Teori Genjutsu', type: 'quiz', order: 4 },
        { title: 'Praktik Genjutsu Sederhana', type: 'practice', order: 5 },
        { title: 'Strategi Penggunaan Genjutsu', type: 'video', order: 6 },
        { title: 'Ujian Akhir Genjutsu', type: 'exam', order: 7 },
        { title: 'Sertifikat', type: 'certificate', order: 8 }
      ]
    },
    {
      title: 'Teknik Chakra Control',
      rankLevel: 'Chunin',
      description: 'Tingkatkan kemampuan kontrol chakra-mu. Pelajari teknik-teknik advanced untuk efisiensi chakra maksimal.',
      duration: '5 jam',
      modules: 15,
      price: 0,
      contents: [
        { title: 'Review Chakra Fundamental', type: 'video', order: 1 },
        { title: 'Teknik Konsentrasi Chakra', type: 'video', order: 2 },
        { title: 'Tree Walking Exercise', type: 'video', order: 3 },
        { title: 'Water Walking Exercise', type: 'video', order: 4 },
        { title: 'Quiz: Chakra Control Basics', type: 'quiz', order: 5 },
        { title: 'Advanced Chakra Manipulation', type: 'video', order: 6 },
        { title: 'Chakra Nature Types', type: 'video', order: 7 },
        { title: 'Praktik Chakra Flow', type: 'practice', order: 8 },
        { title: 'Medical Ninjutsu Introduction', type: 'video', order: 9 },
        { title: 'Chakra Efficiency Techniques', type: 'video', order: 10 },
        { title: 'Quiz: Advanced Chakra', type: 'quiz', order: 11 },
        { title: 'Combat Application', type: 'video', order: 12 },
        { title: 'Final Practical Exam', type: 'practice', order: 13 },
        { title: 'Ujian Akhir Teori', type: 'exam', order: 14 },
        { title: 'Sertifikat Chunin', type: 'certificate', order: 15 }
      ]
    },
    {
      title: 'Taijutsu Advanced',
      rankLevel: 'Chunin',
      description: 'Master teknik pertarungan fisik tingkat lanjut. Kombinasi kecepatan, kekuatan, dan strategi.',
      duration: '6 jam',
      modules: 18,
      price: 0,
      contents: [
        { title: 'Fundamentals Review', type: 'video', order: 1 },
        { title: 'Advanced Strike Techniques', type: 'video', order: 2 },
        { title: 'Defensive Maneuvers', type: 'video', order: 3 },
        { title: 'Speed Training Methods', type: 'video', order: 4 },
        { title: 'Quiz: Taijutsu Theory', type: 'quiz', order: 5 },
        { title: 'Combo Attacks', type: 'video', order: 6 },
        { title: 'Praktik Sparring', type: 'practice', order: 7 },
        { title: 'Eight Gates Introduction', type: 'video', order: 8 },
        { title: 'Strength Building', type: 'video', order: 9 },
        { title: 'Agility Training', type: 'video', order: 10 },
        { title: 'Counter-Attack Strategies', type: 'video', order: 11 },
        { title: 'Quiz: Advanced Techniques', type: 'quiz', order: 12 },
        { title: 'Weapon Integration', type: 'video', order: 13 },
        { title: 'Team Combat Tactics', type: 'video', order: 14 },
        { title: 'Praktik Final', type: 'practice', order: 15 },
        { title: 'Physical Exam', type: 'exam', order: 16 },
        { title: 'Theory Exam', type: 'exam', order: 17 },
        { title: 'Sertifikat Taijutsu Master', type: 'certificate', order: 18 }
      ]
    },
    {
      title: 'Strategi Pertempuran Jonin',
      rankLevel: 'Jonin',
      description: 'Pelajari strategi pertempuran tingkat elite. Leadership, tactical analysis, dan decision making.',
      duration: '8 jam',
      modules: 24,
      price: 0,
      contents: Array.from({ length: 24 }, (_, i) => ({
        title: `Modul ${i + 1}: Strategi Jonin`,
        type: i % 5 === 0 ? 'quiz' : i % 3 === 0 ? 'practice' : 'video',
        order: i + 1
      }))
    },
    {
      title: 'Kepemimpinan Hokage',
      rankLevel: 'Hokage',
      description: 'Persiapan menjadi pemimpin desa. Politik, diplomasi, dan strategic leadership.',
      duration: '10 jam',
      modules: 30,
      price: 0,
      contents: Array.from({ length: 30 }, (_, i) => ({
        title: `Modul ${i + 1}: Leadership Hokage`,
        type: i % 6 === 0 ? 'quiz' : i % 4 === 0 ? 'practice' : 'video',
        order: i + 1
      }))
    }
  ];

  for (const courseData of coursesData) {
    const { contents, ...courseInfo } = courseData;
    
    const course = await prisma.course.create({
      data: courseInfo
    });

    // Create contents for course
    for (const content of contents) {
      await prisma.content.create({
        data: {
          courseId: course.id,
          title: content.title,
          type: content.type,
          url: `https://example.com/video/${course.id}/${content.order}`,
          body: `Konten lengkap untuk ${content.title}. Materi ini mencakup teori dan praktik yang diperlukan.`,
          order: content.order
        }
      });
    }

    console.log(`✅ Created course: ${course.title} with ${contents.length} contents`);
  }

  // Create sample enrollments for userId 2 (Naruto)
  const courses = await prisma.course.findMany();
  
  // Enroll Naruto to first 3 courses
  await prisma.enrollment.create({
    data: {
      userId: 2,
      courseId: courses[0].id
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: 2,
      courseId: courses[1].id
    }
  });

  await prisma.enrollment.create({
    data: {
      userId: 2,
      courseId: courses[2].id
    }
  });

  console.log('✅ Created sample enrollments');

  // Create progress for Naruto
  await prisma.progress.create({
    data: {
      userId: 2,
      courseId: courses[0].id,
      percent: 75.00
    }
  });

  await prisma.progress.create({
    data: {
      userId: 2,
      courseId: courses[1].id,
      percent: 100.00 // Completed
    }
  });

  await prisma.progress.create({
    data: {
      userId: 2,
      courseId: courses[2].id,
      percent: 30.00
    }
  });

  console.log('✅ Created sample progress');

  // Create certificate for completed course
  await prisma.certificate.create({
    data: {
      userId: 2,
      courseId: courses[1].id,
      certificateNumber: 'KNH-2025-001-GEN'
    }
  });

  console.log('✅ Created sample certificate');

  // Create sample exam for first course
  await prisma.exam.create({
    data: {
      courseId: courses[0].id,
      title: 'Ujian Akhir - Dasar Ninjutsu',
      passingScore: 70,
      questions: JSON.stringify([
        {
          id: 1,
          question: 'Apa yang dimaksud dengan Chakra?',
          options: ['Energi fisik', 'Kombinasi energi spiritual dan fisik', 'Energi spiritual', 'Kekuatan alam'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'Berapa jumlah hand seal fundamental?',
          options: ['10', '12', '15', '20'],
          correctAnswer: 1
        },
        {
          id: 3,
          question: 'Teknik transformasi disebut?',
          options: ['Kawarimi', 'Henge', 'Bunshin', 'Shunshin'],
          correctAnswer: 1
        }
      ])
    }
  });

  console.log('✅ Created sample exam');

  console.log('\n🎉 Course Service seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${courses.length} courses`);
  console.log(`   - 3 enrollments (userId: 2)`);
  console.log(`   - 3 progress records`);
  console.log(`   - 1 certificate`);
  console.log(`   - 1 exam`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });