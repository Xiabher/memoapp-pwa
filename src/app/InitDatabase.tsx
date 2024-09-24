import { initDb } from '@/lib/Database'

export default async function InitDatabase() {
  console.log('Attempting to initialize database...');
  try {
    await initDb();
    console.log('Database initialization process completed successfully');
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
  return null;
}