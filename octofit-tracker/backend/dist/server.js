"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0';
async function startServer() {
    const app = (0, app_js_1.createApp)();
    await (0, app_js_1.connectToDatabaseWithFallback)();
    app.listen(PORT, HOST, () => {
        console.log(`Backend listening on http://${HOST}:${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
