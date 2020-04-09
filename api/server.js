const express = require("express");

const AccountsRouter = require("./accounts/accounts-router");
const { middleware } = require("./middleware/middleware");

const server = express();

server.use(express.json());
server.use("/api/accounts", middleware, AccountsRouter);

server.get("/", (req, res) => {
	res.status(200).json({ api: "Ready to go" });
});

module.exports = server;
