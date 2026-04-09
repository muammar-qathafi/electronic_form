const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/templates', formController.getFormTemplates);
router.get('/templates/:id', formController.getFormTemplateById);

// Protected routes (require authentication)
router.post('/submit', authMiddleware.authenticate, formController.submitForm);
router.get('/submissions', authMiddleware.authenticate, formController.getSubmissions);
router.get('/submissions/:id', authMiddleware.authenticate, formController.getSubmissionById);
router.put('/submissions/:id', authMiddleware.authenticate, formController.updateSubmission);
router.delete('/submissions/:id', authMiddleware.authenticate, formController.deleteSubmission);

// Form validation
router.post('/validate', formController.validateForm);

module.exports = router;
