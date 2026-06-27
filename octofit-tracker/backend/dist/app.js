"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiBaseUrl = createApiBaseUrl;
exports.createApp = createApp;
exports.connectToDatabaseWithFallback = connectToDatabaseWithFallback;
const express_1 = __importDefault(require("express"));
const models_js_1 = require("./models.js");
const database_js_1 = require("./config/database.js");
function createApiBaseUrl(req) {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return req?.protocol && req.get('host')
        ? `${req.protocol}://${req.get('host')}`
        : 'http://localhost:8000';
}
async function getUsers() {
    return models_js_1.User.find({}).lean();
}
async function getTeams() {
    return models_js_1.Team.find({}).populate('members').populate('captain').lean();
}
async function getActivities() {
    return models_js_1.Activity.find({}).populate('userId').lean();
}
async function getLeaderboard() {
    return models_js_1.LeaderboardEntry.find({}).populate('userId').lean();
}
async function getWorkouts() {
    return models_js_1.Workout.find({}).lean();
}
function registerRoutes(app) {
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', apiUrl: createApiBaseUrl(req) });
    });
    app.get('/api/users/', async (req, res) => {
        const users = await getUsers();
        res.json({ apiUrl: createApiBaseUrl(req), users });
    });
    app.get('/api/teams/', async (req, res) => {
        const teams = await getTeams();
        res.json({ apiUrl: createApiBaseUrl(req), teams });
    });
    app.get('/api/activities/', async (req, res) => {
        const activities = await getActivities();
        res.json({ apiUrl: createApiBaseUrl(req), activities });
    });
    app.get('/api/leaderboard/', async (req, res) => {
        const leaderboard = await getLeaderboard();
        res.json({ apiUrl: createApiBaseUrl(req), leaderboard });
    });
    app.get('/api/workouts/', async (req, res) => {
        const workouts = await getWorkouts();
        res.json({ apiUrl: createApiBaseUrl(req), workouts });
    });
}
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    registerRoutes(app);
    return app;
}
async function connectToDatabaseWithFallback() {
    try {
        await (0, database_js_1.connectToDatabase)();
        return true;
    }
    catch (error) {
        console.warn('MongoDB connection skipped:', error);
        return false;
    }
}
