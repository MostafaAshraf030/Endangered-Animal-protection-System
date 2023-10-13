/* eslint-disable no-console */
const logger = require("./logger");
const app = require("./app");
const port = app.get("port");
const server = app.listen(port);
// const io = require("socket.io");

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () => {
  logger.info(
    "Feathers application started on http://%s:%d",
    app.get("host"),
    port
  );
});

server.on("connection", () => {
  server.emit("dfhasdgkhfgaksdh");
  // console.log("AHAAHAHAHA", port);
});
