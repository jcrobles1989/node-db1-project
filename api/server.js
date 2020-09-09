const express = require("express");

const AccountsRouter = require("../accounts/account-router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
