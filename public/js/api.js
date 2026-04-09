/**
 * API Service - Handles all API communications
 */
class APIService {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.token = localStorage.getItem('token') || null;
    }

    /**
     * Set authentication token
     */
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    /**
     * Get authentication headers
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Make API request
     */
    async request(endpoint, method = 'GET', data = null) {
        const options = {
            method,
            headers: this.getHeaders()
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'API request failed');
            }

            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // User Authentication
    async register(userData) {
        const result = await this.request('/users/register', 'POST', userData);
        if (result.success && result.data.token) {
            this.setToken(result.data.token);
        }
        return result;
    }

    async login(credentials) {
        const result = await this.request('/users/login', 'POST', credentials);
        if (result.success && result.data.token) {
            this.setToken(result.data.token);
        }
        return result;
    }

    async logout() {
        const result = await this.request('/users/logout', 'POST');
        this.setToken(null);
        return result;
    }

    async getProfile() {
        return await this.request('/users/profile');
    }

    // Form Templates
    async getFormTemplates(category = null) {
        const endpoint = category 
            ? `/forms/templates?category=${category}` 
            : '/forms/templates';
        return await this.request(endpoint);
    }

    async getFormTemplate(id) {
        return await this.request(`/forms/templates/${id}`);
    }

    // Form Submissions
    async submitForm(templateId, formData) {
        return await this.request('/forms/submit', 'POST', {
            templateId,
            data: formData
        });
    }

    async getSubmissions() {
        return await this.request('/forms/submissions');
    }

    async getSubmission(id) {
        return await this.request(`/forms/submissions/${id}`);
    }

    async updateSubmission(id, data) {
        return await this.request(`/forms/submissions/${id}`, 'PUT', data);
    }

    async deleteSubmission(id) {
        return await this.request(`/forms/submissions/${id}`, 'DELETE');
    }

    // K-Link Documents
    async uploadDocument(documentData) {
        return await this.request('/klink/documents/upload', 'POST', documentData);
    }

    async getDocuments(search = null) {
        const endpoint = search 
            ? `/klink/documents?search=${encodeURIComponent(search)}` 
            : '/klink/documents';
        return await this.request(endpoint);
    }

    async getDocument(id) {
        return await this.request(`/klink/documents/${id}`);
    }

    async deleteDocument(id) {
        return await this.request(`/klink/documents/${id}`, 'DELETE');
    }

    async shareDocument(id, userIds) {
        return await this.request(`/klink/documents/${id}/share`, 'POST', { userIds });
    }

    async searchDocuments(query) {
        return await this.request(`/klink/search?query=${encodeURIComponent(query)}`);
    }
}

// Create global API instance
const api = new APIService();
