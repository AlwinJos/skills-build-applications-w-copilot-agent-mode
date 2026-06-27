"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const PORT = process.env.PORT || 8000;
async function startServer() {
    const app = (0, app_js_1.createApp)();
    await (0, app_js_1.connectToDatabaseWithFallback)();
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
