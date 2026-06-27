import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();
  await (await import('mongoose')).default.connection.dropDatabase();

  const users = await User.create([
    { name: 'Ava Chen', email: 'ava.chen@example.com', fitnessGoal: 'Strength', age: 29, city: 'Seattle' },
    { name: 'Liam Ortiz', email: 'liam.ortiz@example.com', fitnessGoal: 'Endurance', age: 34, city: 'Austin' },
    { name: 'Mina Patel', email: 'mina.patel@example.com', fitnessGoal: 'Mobility', age: 27, city: 'Denver' },
  ]);

  const teams = await Team.create([
    { name: 'Storm Squad', sport: 'CrossFit', members: [users[0]._id, users[1]._id], captain: users[0]._id },
    { name: 'Trail Blazers', sport: 'Running', members: [users[1]._id, users[2]._id], captain: users[2]._id },
  ]);

  await Activity.create([
    { userId: users[0]._id, type: 'Strength', durationMinutes: 45, caloriesBurned: 420, date: new Date('2026-06-20') },
    { userId: users[1]._id, type: 'Run', durationMinutes: 35, caloriesBurned: 310, date: new Date('2026-06-21') },
    { userId: users[2]._id, type: 'Yoga', durationMinutes: 30, caloriesBurned: 180, date: new Date('2026-06-22') },
  ]);

  await LeaderboardEntry.create([
    { userId: users[0]._id, score: 980, rank: 1 },
    { userId: users[1]._id, score: 915, rank: 2 },
    { userId: users[2]._id, score: 892, rank: 3 },
  ]);

  await Workout.create([
    { name: 'HIIT Circuit', difficulty: 'Intermediate', durationMinutes: 25, focusArea: 'Cardio' },
    { name: 'Morning Mobility', difficulty: 'Beginner', durationMinutes: 20, focusArea: 'Flexibility' },
    { name: 'Power Lift', difficulty: 'Advanced', durationMinutes: 50, focusArea: 'Strength' },
  ]);

  console.log('Seed complete. Created users, teams, activities, leaderboard entries, and workouts.');
  await disconnectFromDatabase();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
