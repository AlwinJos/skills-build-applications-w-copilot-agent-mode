import { createApp, connectToDatabaseWithFallback } from './app.js';

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME || process.env.GITHUB_CODESPACE_NAME;
const apiBaseUrl = codespaceName?.trim()
  ? `https://${codespaceName.trim()}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

async function startServer(): Promise<void> {
  const app = createApp();
  await connectToDatabaseWithFallback();

  app.listen(PORT, HOST, () => {
    console.log(`Backend listening on ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
