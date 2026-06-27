import express, { type Express, type Request, type Response } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { connectToDatabase } from './config/database.js';

export function createApiBaseUrl(req?: Request): string {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return req?.protocol && req.get('host')
    ? `${req.protocol}://${req.get('host')}`
    : 'http://localhost:8000';
}

async function getUsers(): Promise<unknown[]> {
  return User.find({}).lean();
}

async function getTeams(): Promise<unknown[]> {
  return Team.find({}).populate('members').populate('captain').lean();
}

async function getActivities(): Promise<unknown[]> {
  return Activity.find({}).populate('userId').lean();
}

async function getLeaderboard(): Promise<unknown[]> {
  return LeaderboardEntry.find({}).populate('userId').lean();
}

async function getWorkouts(): Promise<unknown[]> {
  return Workout.find({}).lean();
}

function registerRoutes(app: Express): void {
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', apiUrl: createApiBaseUrl(req) });
  });

  app.get('/api/users/', async (req: Request, res: Response) => {
    const users = await getUsers();
    res.json({ apiUrl: createApiBaseUrl(req), users });
  });

  app.get('/api/teams/', async (req: Request, res: Response) => {
    const teams = await getTeams();
    res.json({ apiUrl: createApiBaseUrl(req), teams });
  });

  app.get('/api/activities/', async (req: Request, res: Response) => {
    const activities = await getActivities();
    res.json({ apiUrl: createApiBaseUrl(req), activities });
  });

  app.get('/api/leaderboard/', async (req: Request, res: Response) => {
    const leaderboard = await getLeaderboard();
    res.json({ apiUrl: createApiBaseUrl(req), leaderboard });
  });

  app.get('/api/workouts/', async (req: Request, res: Response) => {
    const workouts = await getWorkouts();
    res.json({ apiUrl: createApiBaseUrl(req), workouts });
  });
}

export function createApp(): Express {
  const app = express();
  app.use(express.json());
  registerRoutes(app);
  return app;
}

export async function connectToDatabaseWithFallback(): Promise<boolean> {
  try {
    await connectToDatabase();
    return true;
  } catch (error) {
    console.warn('MongoDB connection skipped:', error);
    return false;
  }
}
