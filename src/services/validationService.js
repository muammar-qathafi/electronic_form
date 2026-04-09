/**
 * Validation utilities for form data
 */
class ValidationService {
  /**
   * Validate email format
   * @param {string} email - Email address to validate
   * @returns {boolean} True if valid
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid
   */
  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  /**
   * Validate date format (YYYY-MM-DD)
   * @param {string} date - Date string to validate
   * @returns {boolean} True if valid
   */
  isValidDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  }

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sanitize string input
   * @param {string} input - String to sanitize
   * @returns {string} Sanitized string
   */
  sanitizeString(input) {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .substring(0, 1000); // Limit length
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} Validation result with score and feedback
   */
  validatePasswordStrength(password) {
    const result = {
      isValid: false,
      score: 0,
      feedback: []
    };

    if (!password || password.length < 8) {
      result.feedback.push('Password must be at least 8 characters long');
      return result;
    }

    let score = 0;
    
    // Length check
    if (password.length >= 12) score += 2;
    else if (password.length >= 10) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z\d]/.test(password)) score += 1;

    result.score = score;
    result.isValid = score >= 4;

    if (!/[a-z]/.test(password)) {
      result.feedback.push('Add lowercase letters');
    }
    if (!/[A-Z]/.test(password)) {
      result.feedback.push('Add uppercase letters');
    }
    if (!/\d/.test(password)) {
      result.feedback.push('Add numbers');
    }
    if (!/[^a-zA-Z\d]/.test(password)) {
      result.feedback.push('Add special characters');
    }

    return result;
  }

  /**
   * Validate file upload
   * @param {Object} file - File object
   * @param {Object} options - Validation options
   * @returns {Object} Validation result
   */
  validateFileUpload(file, options = {}) {
    const {
      maxSize = 10485760, // 10MB default
      allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain']
    } = options;

    const result = {
      isValid: true,
      errors: []
    };

    if (!file) {
      result.isValid = false;
      result.errors.push('No file provided');
      return result;
    }

    if (file.size > maxSize) {
      result.isValid = false;
      result.errors.push(`File size exceeds maximum of ${maxSize / 1048576}MB`);
    }

    if (!allowedTypes.includes(file.mimetype)) {
      result.isValid = false;
      result.errors.push(`File type ${file.mimetype} is not allowed`);
    }

    return result;
  }
}

module.exports = new ValidationService();
