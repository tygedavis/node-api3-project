const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => { //✔
  Users.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ error: "Unable to retrieve the user data" })
    })
});

router.get('/:id', validateUserId, (req, res) => { //✔
  Users.getById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error with the database" });
    })
});

router.get('/:id/posts', (req, res) => { //✔
  Users.getById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(400).json({ error: "User not found" });
      } else {
        Users.getUserPosts(user.id)
          .then(userPosts => {
            res.status(200).json(userPosts);
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error with the database" });
          })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error with the database" });
    })
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
    Users.getById(req.body.id)
      .then(user => {
        user = req.user;

        next();
      })
      .catch(err => {
        res.status(400).json({ message: "Invalid user ID" });
      });
  };
};

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
};

module.exports = router;