const { v4: uuidv4 } = require('uuid');
const klinkService = require('../services/klinkService');

// In-memory storage (for demonstration purposes)
let documents = [];

class KLinkController {
  // Upload a document to K-Link
  async uploadDocument(req, res) {
    try {
      const { title, description, content, metadata } = req.body;
      const userId = req.user?.id || 'anonymous';
      
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Title and content are required'
        });
      }

      // Simulate K-Link API integration
      const document = {
        id: uuidv4(),
        title,
        description: description || '',
        content,
        metadata: metadata || {},
        userId,
        uploadedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sharedWith: [],
        status: 'active'
      };

      // Call K-Link service (simulated)
      const klinkResponse = await klinkService.uploadToKLink(document);
      
      if (klinkResponse.success) {
        document.klinkId = klinkResponse.klinkId;
        documents.push(document);
        
        res.status(201).json({
          success: true,
          data: document,
          message: 'Document uploaded successfully'
        });
      } else {
        throw new Error('Failed to upload to K-Link');
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get all documents for a user
  async getDocuments(req, res) {
    try {
      const userId = req.user?.id || 'anonymous';
      const { status, search } = req.query;
      
      let userDocuments = documents.filter(
        d => d.userId === userId || d.sharedWith.includes(userId)
      );
      
      if (status) {
        userDocuments = userDocuments.filter(d => d.status === status);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        userDocuments = userDocuments.filter(
          d => d.title.toLowerCase().includes(searchLower) ||
               d.description.toLowerCase().includes(searchLower)
        );
      }
      
      res.json({
        success: true,
        data: userDocuments,
        count: userDocuments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get a specific document by ID
  async getDocumentById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'anonymous';
      
      const document = documents.find(
        d => d.id === id && (d.userId === userId || d.sharedWith.includes(userId))
      );
      
      if (!document) {
        return res.status(404).json({
          success: false,
          error: 'Document not found or access denied'
        });
      }
      
      res.json({
        success: true,
        data: document
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Delete a document
  async deleteDocument(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'anonymous';
      
      const index = documents.findIndex(d => d.id === id && d.userId === userId);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Document not found or access denied'
        });
      }
      
      // Call K-Link service to delete (simulated)
      const klinkResponse = await klinkService.deleteFromKLink(documents[index].klinkId);
      
      if (klinkResponse.success) {
        documents.splice(index, 1);
        
        res.json({
          success: true,
          message: 'Document deleted successfully'
        });
      } else {
        throw new Error('Failed to delete from K-Link');
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Share a document with other users
  async shareDocument(req, res) {
    try {
      const { id } = req.params;
      const { userIds } = req.body;
      const userId = req.user?.id || 'anonymous';
      
      if (!userIds || !Array.isArray(userIds)) {
        return res.status(400).json({
          success: false,
          error: 'User IDs array is required'
        });
      }
      
      const document = documents.find(d => d.id === id && d.userId === userId);
      
      if (!document) {
        return res.status(404).json({
          success: false,
          error: 'Document not found or access denied'
        });
      }
      
      // Add new users to shared list
      userIds.forEach(uid => {
        if (!document.sharedWith.includes(uid)) {
          document.sharedWith.push(uid);
        }
      });
      
      document.updatedAt = new Date().toISOString();
      
      res.json({
        success: true,
        data: document,
        message: 'Document shared successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get list of users a document is shared with
  async getSharedUsers(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'anonymous';
      
      const document = documents.find(d => d.id === id && d.userId === userId);
      
      if (!document) {
        return res.status(404).json({
          success: false,
          error: 'Document not found or access denied'
        });
      }
      
      res.json({
        success: true,
        data: {
          documentId: document.id,
          sharedWith: document.sharedWith
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Search documents in K-Link
  async searchDocuments(req, res) {
    try {
      const { query } = req.query;
      const userId = req.user?.id || 'anonymous';
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query is required'
        });
      }
      
      // Simulate K-Link search
      const results = await klinkService.searchKLink(query, userId);
      
      res.json({
        success: true,
        data: results,
        count: results.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new KLinkController();
