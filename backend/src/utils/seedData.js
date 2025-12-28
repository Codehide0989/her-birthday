const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Module = require('../models/Module');
const Content = require('../models/Content');

const seedSubjects = async () => {
  const subjects = [
    {
      title: 'Mathematics',
      description: 'Master fundamental and advanced mathematical concepts',
      icon: '📐',
      color: '#3B82F6',
      order: 1,
      isPublished: true,
      accessLevel: 'free',
      totalChapters: 3,
      totalModules: 9,
    },
    {
      title: 'Physics',
      description: 'Explore the laws of nature and the universe',
      icon: '⚛️',
      color: '#10B981',
      order: 2,
      isPublished: true,
      accessLevel: 'premium',
      totalChapters: 3,
      totalModules: 8,
    },
    {
      title: 'Computer Science',
      description: 'Learn programming, algorithms, and software development',
      icon: '💻',
      color: '#8B5CF6',
      order: 3,
      isPublished: true,
      accessLevel: 'premium',
      totalChapters: 4,
      totalModules: 12,
    },
  ];

  try {
    await Subject.deleteMany({});
    const createdSubjects = await Subject.insertMany(subjects);
    console.log('✅ Subjects seeded successfully');
    return createdSubjects;
  } catch (error) {
    console.error('❌ Error seeding subjects:', error);
    throw error;
  }
};

const seedChapters = async (subjectId) => {
  const chapters = [
    {
      subjectId,
      title: 'Introduction',
      description: 'Getting started with the basics',
      order: 1,
      isPublished: true,
      accessLevel: 'free',
      totalModules: 3,
      estimatedDuration: 90,
    },
    {
      subjectId,
      title: 'Intermediate Concepts',
      description: 'Building on the fundamentals',
      order: 2,
      isPublished: true,
      accessLevel: 'premium',
      totalModules: 3,
      estimatedDuration: 120,
    },
    {
      subjectId,
      title: 'Advanced Topics',
      description: 'Master the advanced concepts',
      order: 3,
      isPublished: true,
      accessLevel: 'premium',
      totalModules: 3,
      estimatedDuration: 150,
    },
  ];

  try {
    const createdChapters = await Chapter.insertMany(chapters);
    console.log(`✅ Chapters seeded for subject ${subjectId}`);
    return createdChapters;
  } catch (error) {
    console.error('❌ Error seeding chapters:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    const subjects = await seedSubjects();

    for (const subject of subjects) {
      await seedChapters(subject._id);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${subjects.length} subjects with chapters`);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

module.exports = { seedDatabase, seedSubjects, seedChapters };
