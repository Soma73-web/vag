const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../uploadMiddleware');

router.post('/', upload.single('image'), galleryController.uploadImage);
router.get('/', galleryController.getAllImages);
router.delete('/:id', galleryController.deleteImage);
router.put('/:id', upload.single('image'), galleryController.updateImage);

module.exports = router;