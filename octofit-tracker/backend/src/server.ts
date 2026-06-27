import { createApp, connectToDatabaseWithFallback } from './app.js';

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';

async function startServer(): Promise<void> {
  const app = createApp();
  await connectToDatabaseWithFallback();

  app.listen(PORT, HOST, () => {
    console.log(`Backend listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
