const express = require('express');
const router = express.Router();
const klinkController = require('../controllers/klinkController');
const authMiddleware = require('../middleware/authMiddleware');

// All K-Link routes require authentication
router.use(authMiddleware.authenticate);

// Document management
router.post('/documents/upload', klinkController.uploadDocument);
router.get('/documents', klinkController.getDocuments);
router.get('/documents/:id', klinkController.getDocumentById);
router.delete('/documents/:id', klinkController.deleteDocument);

// Document sharing and collaboration
router.post('/documents/:id/share', klinkController.shareDocument);
router.get('/documents/:id/shared-with', klinkController.getSharedUsers);

// Document search
router.get('/search', klinkController.searchDocuments);

module.exports = router;
