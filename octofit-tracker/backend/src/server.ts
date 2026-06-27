import { createApp, connectToDatabaseWithFallback } from './app.js';

const PORT = process.env.PORT || 8000;

async function startServer(): Promise<void> {
  const app = createApp();
  await connectToDatabaseWithFallback();

  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
