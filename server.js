const express = require('express');
const userRouter = require('./users/userRouter.js');
const server = express();

//Global Middleware
server.use(logger);

//Routers
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


// ✔ 1️⃣ Custom middleware (logger)
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`)

  next();
};

module.exports = server;