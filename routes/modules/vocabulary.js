const express = require("express");
const router = express.Router();

const vocabularyController= require('../../controllers/vocabulary-controller')

router.get("/:id", vocabularyController.getVocabulary);
router.post("/",vocabularyController.postVocabulary);
router.put("/:id",vocabularyController.putVocabulary);

module.exports = router;