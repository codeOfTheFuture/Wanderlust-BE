const express = require("express");
const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");
const tourRouter = require("../tours/tours-router");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/tours", tourRouter);

server.get("/", (req, res) => {
  res.send("Wanderlust BE");
});

module.exports = server;
