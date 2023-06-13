import { app, server } from "./index";

async function run() {
  server.listen(app.get("port"));
  console.log(`listening on  port ${app.get("port")}`);
}
run();
