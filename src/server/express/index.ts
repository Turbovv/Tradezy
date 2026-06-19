import { createApp } from "./app";

const port = Number(process.env.EXPRESS_PORT ?? 4000);

const app = createApp();

app.listen(port, () => {
  console.log(`🚀 Express API listening on http://localhost:${port}`);
});
