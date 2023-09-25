const express = require("express");
const router = express.Router();

// const User = require('../../models/user')
// const passport = require("passport");

const userController = require("../../controllers/user-controller");

router.get("/:id", userController.getUser);
router.get("/:id/vocabularies", userController.getUserVocabularies);

module.exports = router;
