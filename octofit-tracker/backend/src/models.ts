import { model, Schema, type Document, type Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessGoal: string;
  age: number;
  city: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: Types.ObjectId[];
  captain: Types.ObjectId;
}

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  score: number;
  rank: number;
}

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  durationMinutes: number;
  focusArea: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, required: true },
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
export const Team = model<ITeam>('Team', teamSchema);
export const Activity = model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = model<IWorkout>('Workout', workoutSchema);
