const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const LikesController = require("../controllers/likes")
const likesController = new LikesController();

router.get('/', authMiddleware, likesController.getlikes);
router.put('/:postId', authMiddleware, likesController.putLike);

module.exports = router;