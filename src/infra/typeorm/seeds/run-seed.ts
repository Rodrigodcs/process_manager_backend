import { AppDataSource } from '../data-source';
import { runSeed } from './database.seed';

async function main() {
  try {
    console.log('🔌 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Database connected!');
    console.log('');

    await runSeed(AppDataSource);

    await AppDataSource.destroy();
    console.log('');
    console.log('👋 Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running seed:', error);
    process.exit(1);
  }
}

main();
