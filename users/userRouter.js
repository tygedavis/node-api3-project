const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error with the database" });
    })
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
  return res.status(200).json(req.user);
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

router.delete('/:id', validateUserId, (req, res) => { //✔
  Users.remove(req.params.id)
    .then(deletedPost => {
      res.status(200).json(deletedPost);
    })
    .catch(err => {
      res.status(404).json({ error: "The user with that ID doesn't exist." });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// ✔ 2️⃣ Custom middleware (validateUserId())
function validateUserId(req, res, next) {
  if(req.params.id) {
    Users.getById(req.params.id)
      .then(user => {
        req.user = user;

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
    res.status(400).json({ error: "Invalid body" });
  } else if (!req.body.name) {
    res.status(400).json({ error: "Missing required name field" });
  } else {
    next();
  };
};

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