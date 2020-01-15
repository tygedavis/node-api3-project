const express = require('express');

const router = express.Router();

const User = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// ✔ 2️⃣ Custom middleware (validateUserId())
function validateUserId(req, res, next) {
  if(req.body.id) {
    User.getById(req.body.id)
      .then(user => {
        user = req.user;

        next();
      })
      .catch(err => {
        res.status(400).json({ message: "Invalid user ID" });
      });
}

// ✔ 3️⃣ Custom middleware (validateUser())
function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ error: "Invalid user ID" });
  } else if (!req.body.name) {
    res.status(400).json({ error: "Missing required name field" });
  }
}

// ✔ 4️⃣ Custome middleware (validatePost())
function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ error: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
