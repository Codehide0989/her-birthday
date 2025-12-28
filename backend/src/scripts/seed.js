require('dotenv').config();
const connectDB = require('../config/database');
const { seedDatabase } = require('../utils/seedData');

const runSeed = async () => {
  try {
    await connectDB();
    await seedDatabase();
    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
