/**
 * Main Application Logic
 */
class App {
    constructor() {
        this.currentUser = null;
        this.currentTemplate = null;
        this.init();
    }

    /**
     * Initialize application
     */
    async init() {
        this.setupEventListeners();
        await this.checkAuthStatus();
        this.loadInitialData();
        this.setupNavigation();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Dynamic form submission
        const dynamicForm = document.getElementById('dynamicForm');
        if (dynamicForm) {
            dynamicForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Document upload
        const uploadDocBtn = document.getElementById('uploadDocBtn');
        if (uploadDocBtn) {
            uploadDocBtn.addEventListener('click', () => this.handleDocumentUpload());
        }

        // Document search
        const searchInput = document.getElementById('searchDocuments');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleDocumentSearch(e.target.value));
        }

        // Navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = e.target.getAttribute('href');
                
                if (href === '#login') {
                    e.preventDefault();
                    ui.openModal('loginModal');
                } else if (href === '#register') {
                    e.preventDefault();
                    ui.openModal('registerModal');
                } else if (href === '#logout') {
                    e.preventDefault();
                    this.handleLogout();
                }
            });
        });
    }

    /**
     * Setup smooth navigation
     */
    setupNavigation() {
        document.querySelectorAll('a[href^="#"]:not([href="#login"]):not([href="#register"]):not([href="#logout"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }

    /**
     * Check if user is authenticated
     */
    async checkAuthStatus() {
        if (api.token) {
            try {
                const result = await api.getProfile();
                if (result.success) {
                    this.currentUser = result.data;
                    ui.updateAuthUI(true, this.currentUser);
                }
            } catch (error) {
                // Token invalid, clear it
                api.setToken(null);
                ui.updateAuthUI(false);
            }
        } else {
            ui.updateAuthUI(false);
        }
    }

    /**
     * Load initial data
     */
    async loadInitialData() {
        await this.loadTemplates();
        
        if (this.currentUser) {
            await this.loadSubmissions();
            await this.loadDocuments();
        }
    }

    /**
     * Load form templates
     */
    async loadTemplates() {
        try {
            const result = await api.getFormTemplates();
            if (result.success) {
                ui.renderTemplates(result.data);
            }
        } catch (error) {
            console.error('Error loading templates:', error);
            ui.showAlert('Failed to load form templates', 'error');
        }
    }

    /**
     * Load user submissions
     */
    async loadSubmissions() {
        try {
            const result = await api.getSubmissions();
            if (result.success) {
                ui.renderSubmissions(result.data);
            }
        } catch (error) {
            console.error('Error loading submissions:', error);
        }
    }

    /**
     * Load user documents
     */
    async loadDocuments() {
        try {
            const result = await api.getDocuments();
            if (result.success) {
                ui.renderDocuments(result.data);
            }
        } catch (error) {
            console.error('Error loading documents:', error);
        }
    }

    /**
     * Handle login
     */
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');

        ui.setButtonLoading(submitBtn, true);

        try {
            const result = await api.login({ email, password });
            
            if (result.success) {
                this.currentUser = result.data.user;
                ui.updateAuthUI(true, this.currentUser);
                ui.closeModal('loginModal');
                ui.showAlert('Login successful!', 'success');
                await this.loadInitialData();
            }
        } catch (error) {
            ui.showAlert(error.message || 'Login failed', 'error');
        } finally {
            ui.setButtonLoading(submitBtn, false);
        }
    }

    /**
     * Handle register
     */
    async handleRegister(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const fullName = document.getElementById('registerFullName').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');

        ui.setButtonLoading(submitBtn, true);

        try {
            const result = await api.register({ username, email, password, fullName });
            
            if (result.success) {
                this.currentUser = result.data.user;
                ui.updateAuthUI(true, this.currentUser);
                ui.closeModal('registerModal');
                ui.showAlert('Registration successful!', 'success');
                await this.loadInitialData();
            }
        } catch (error) {
            ui.showAlert(error.message || 'Registration failed', 'error');
        } finally {
            ui.setButtonLoading(submitBtn, false);
        }
    }

    /**
     * Handle logout
     */
    async handleLogout() {
        try {
            await api.logout();
            this.currentUser = null;
            ui.updateAuthUI(false);
            ui.showAlert('Logged out successfully', 'info');
            
            // Clear submissions and documents
            ui.renderSubmissions([]);
            ui.renderDocuments([]);
        } catch (error) {
            ui.showAlert('Logout failed', 'error');
        }
    }

    /**
     * Open form modal with template
     */
    async openFormModal(templateId) {
        if (!this.currentUser) {
            ui.showAlert('Please login to fill forms', 'info');
            ui.openModal('loginModal');
            return;
        }

        try {
            const result = await api.getFormTemplate(templateId);
            
            if (result.success) {
                this.currentTemplate = result.data;
                document.getElementById('formModalTitle').textContent = this.currentTemplate.name;
                ui.generateFormFields(this.currentTemplate);
                ui.openModal('formModal');
            }
        } catch (error) {
            ui.showAlert('Failed to load form template', 'error');
        }
    }

    /**
     * Handle form submission
     */
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.currentTemplate) return;

        const formData = {};
        const form = e.target;
        
        this.currentTemplate.fields.forEach(field => {
            const input = form.querySelector(`[name="${field.id}"]`);
            if (input) {
                formData[field.id] = input.value;
            }
        });

        const submitBtn = form.querySelector('button[type="submit"]');
        ui.setButtonLoading(submitBtn, true);

        try {
            const result = await api.submitForm(this.currentTemplate.id, formData);
            
            if (result.success) {
                ui.showAlert('Form submitted successfully!', 'success');
                ui.closeModal('formModal');
                form.reset();
                await this.loadSubmissions();
            }
        } catch (error) {
            ui.showAlert(error.message || 'Form submission failed', 'error');
        } finally {
            ui.setButtonLoading(submitBtn, false);
        }
    }

    /**
     * View submission details
     */
    async viewSubmission(id) {
        try {
            const result = await api.getSubmission(id);
            
            if (result.success) {
                const submission = result.data;
                alert(`Submission Details:\n\n${JSON.stringify(submission.data, null, 2)}`);
                // In a real app, show this in a nice modal
            }
        } catch (error) {
            ui.showAlert('Failed to load submission', 'error');
        }
    }

    /**
     * Delete submission
     */
    async deleteSubmission(id) {
        if (!confirm('Are you sure you want to delete this submission?')) return;

        try {
            const result = await api.deleteSubmission(id);
            
            if (result.success) {
                ui.showAlert('Submission deleted successfully', 'success');
                await this.loadSubmissions();
            }
        } catch (error) {
            ui.showAlert('Failed to delete submission', 'error');
        }
    }

    /**
     * Handle document upload
     */
    async handleDocumentUpload() {
        if (!this.currentUser) {
            ui.showAlert('Please login to upload documents', 'info');
            ui.openModal('loginModal');
            return;
        }

        const title = prompt('Enter document title:');
        if (!title) return;

        const description = prompt('Enter document description (optional):');
        const content = prompt('Enter document content:');
        
        if (!content) {
            ui.showAlert('Content is required', 'error');
            return;
        }

        try {
            const result = await api.uploadDocument({ title, description, content });
            
            if (result.success) {
                ui.showAlert('Document uploaded successfully!', 'success');
                await this.loadDocuments();
            }
        } catch (error) {
            ui.showAlert(error.message || 'Document upload failed', 'error');
        }
    }

    /**
     * Delete document
     */
    async deleteDocument(id) {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            const result = await api.deleteDocument(id);
            
            if (result.success) {
                ui.showAlert('Document deleted successfully', 'success');
                await this.loadDocuments();
            }
        } catch (error) {
            ui.showAlert('Failed to delete document', 'error');
        }
    }

    /**
     * Share document
     */
    async shareDocument(id) {
        const userIds = prompt('Enter user IDs to share with (comma-separated):');
        
        if (!userIds) return;

        const userIdArray = userIds.split(',').map(id => id.trim());

        try {
            const result = await api.shareDocument(id, userIdArray);
            
            if (result.success) {
                ui.showAlert('Document shared successfully!', 'success');
            }
        } catch (error) {
            ui.showAlert(error.message || 'Failed to share document', 'error');
        }
    }

    /**
     * Handle document search
     */
    async handleDocumentSearch(query) {
        if (!this.currentUser) return;

        try {
            if (query.trim()) {
                const result = await api.searchDocuments(query);
                if (result.success) {
                    ui.renderDocuments(result.data);
                }
            } else {
                await this.loadDocuments();
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
