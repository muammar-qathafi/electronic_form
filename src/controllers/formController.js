const { v4: uuidv4 } = require('uuid');

// In-memory storage (for demonstration purposes)
// In production, use a real database
let formSubmissions = [];
const formTemplates = [
  {
    id: 'template-001',
    name: 'Employee Leave Request',
    description: 'Request for employee leave or time off',
    fields: [
      { id: 'employeeName', label: 'Employee Name', type: 'text', required: true },
      { id: 'employeeId', label: 'Employee ID', type: 'text', required: true },
      { id: 'leaveType', label: 'Leave Type', type: 'select', options: ['Annual Leave', 'Sick Leave', 'Personal Leave', 'Unpaid Leave'], required: true },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'End Date', type: 'date', required: true },
      { id: 'reason', label: 'Reason', type: 'textarea', required: true },
      { id: 'emergencyContact', label: 'Emergency Contact', type: 'text', required: false }
    ],
    category: 'HR'
  },
  {
    id: 'template-002',
    name: 'Purchase Request Form',
    description: 'Request for procurement of goods or services',
    fields: [
      { id: 'requesterName', label: 'Requester Name', type: 'text', required: true },
      { id: 'department', label: 'Department', type: 'text', required: true },
      { id: 'itemDescription', label: 'Item Description', type: 'textarea', required: true },
      { id: 'quantity', label: 'Quantity', type: 'number', required: true },
      { id: 'estimatedCost', label: 'Estimated Cost (USD)', type: 'number', required: true },
      { id: 'justification', label: 'Justification', type: 'textarea', required: true },
      { id: 'urgency', label: 'Urgency', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'], required: true }
    ],
    category: 'Procurement'
  },
  {
    id: 'template-003',
    name: 'IT Support Ticket',
    description: 'Request for IT support or technical assistance',
    fields: [
      { id: 'userName', label: 'Your Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'issueType', label: 'Issue Type', type: 'select', options: ['Hardware', 'Software', 'Network', 'Access', 'Other'], required: true },
      { id: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'], required: true },
      { id: 'subject', label: 'Subject', type: 'text', required: true },
      { id: 'description', label: 'Description', type: 'textarea', required: true },
      { id: 'attachments', label: 'Attachments', type: 'file', required: false }
    ],
    category: 'IT'
  }
];

class FormController {
  // Get all form templates
  async getFormTemplates(req, res) {
    try {
      const { category } = req.query;
      let templates = formTemplates;
      
      if (category) {
        templates = templates.filter(t => t.category === category);
      }
      
      res.json({
        success: true,
        data: templates,
        count: templates.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get a specific form template by ID
  async getFormTemplateById(req, res) {
    try {
      const { id } = req.params;
      const template = formTemplates.find(t => t.id === id);
      
      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found'
        });
      }
      
      res.json({
        success: true,
        data: template
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Submit a new form
  async submitForm(req, res) {
    try {
      const { templateId, data } = req.body;
      const userId = req.user?.id || 'anonymous';
      
      if (!templateId || !data) {
        return res.status(400).json({
          success: false,
          error: 'Template ID and form data are required'
        });
      }

      const template = formTemplates.find(t => t.id === templateId);
      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found'
        });
      }

      // Validate required fields
      const validation = this._validateFormData(template, data);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        });
      }

      const submission = {
        id: uuidv4(),
        templateId,
        templateName: template.name,
        data,
        userId,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      formSubmissions.push(submission);

      res.status(201).json({
        success: true,
        data: submission,
        message: 'Form submitted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get all form submissions for a user
  async getSubmissions(req, res) {
    try {
      const userId = req.user?.id || 'anonymous';
      const { status, templateId } = req.query;
      
      let submissions = formSubmissions.filter(s => s.userId === userId);
      
      if (status) {
        submissions = submissions.filter(s => s.status === status);
      }
      
      if (templateId) {
        submissions = submissions.filter(s => s.templateId === templateId);
      }
      
      res.json({
        success: true,
        data: submissions,
        count: submissions.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get a specific submission by ID
  async getSubmissionById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'anonymous';
      
      const submission = formSubmissions.find(s => s.id === id && s.userId === userId);
      
      if (!submission) {
        return res.status(404).json({
          success: false,
          error: 'Submission not found'
        });
      }
      
      res.json({
        success: true,
        data: submission
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Update a submission
  async updateSubmission(req, res) {
    try {
      const { id } = req.params;
      const { data, status } = req.body;
      const userId = req.user?.id || 'anonymous';
      
      const index = formSubmissions.findIndex(s => s.id === id && s.userId === userId);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Submission not found'
        });
      }
      
      if (data) {
        formSubmissions[index].data = { ...formSubmissions[index].data, ...data };
      }
      
      if (status) {
        formSubmissions[index].status = status;
      }
      
      formSubmissions[index].updatedAt = new Date().toISOString();
      
      res.json({
        success: true,
        data: formSubmissions[index],
        message: 'Submission updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Delete a submission
  async deleteSubmission(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id || 'anonymous';
      
      const index = formSubmissions.findIndex(s => s.id === id && s.userId === userId);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Submission not found'
        });
      }
      
      formSubmissions.splice(index, 1);
      
      res.json({
        success: true,
        message: 'Submission deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Validate form data
  async validateForm(req, res) {
    try {
      const { templateId, data } = req.body;
      
      const template = formTemplates.find(t => t.id === templateId);
      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found'
        });
      }

      const validation = this._validateFormData(template, data);
      
      res.json({
        success: true,
        isValid: validation.isValid,
        errors: validation.errors
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Private helper method for validation
  _validateFormData(template, data) {
    const errors = [];
    
    template.fields.forEach(field => {
      if (field.required && (!data[field.id] || data[field.id].trim() === '')) {
        errors.push({
          field: field.id,
          message: `${field.label} is required`
        });
      }
      
      // Type-specific validation
      if (data[field.id]) {
        switch (field.type) {
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data[field.id])) {
              errors.push({
                field: field.id,
                message: `${field.label} must be a valid email address`
              });
            }
            break;
          case 'number':
            if (isNaN(data[field.id])) {
              errors.push({
                field: field.id,
                message: `${field.label} must be a number`
              });
            }
            break;
        }
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = new FormController();
