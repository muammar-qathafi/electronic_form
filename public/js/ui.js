/**
 * UI Service - Handles all UI interactions and updates
 */
class UIService {
    constructor() {
        this.modals = {};
        this.initModals();
    }

    /**
     * Initialize modals
     */
    initModals() {
        const modalIds = ['formModal', 'loginModal', 'registerModal'];
        
        modalIds.forEach(id => {
            const modal = document.getElementById(id);
            if (modal) {
                this.modals[id] = modal;
                
                // Close button
                const closeBtn = modal.querySelector('.close');
                if (closeBtn) {
                    closeBtn.onclick = () => this.closeModal(id);
                }
                
                // Click outside to close
                modal.onclick = (e) => {
                    if (e.target === modal) {
                        this.closeModal(id);
                    }
                };
            }
        });
    }

    /**
     * Open modal
     */
    openModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.style.display = 'block';
        }
    }

    /**
     * Close modal
     */
    closeModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * Show alert message
     */
    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        // Insert at the top of the main content
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(alertDiv, main.firstChild);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    }

    /**
     * Render form templates
     */
    renderTemplates(templates) {
        const grid = document.getElementById('templatesGrid');
        if (!grid) return;

        if (!templates || templates.length === 0) {
            grid.innerHTML = '<p>No templates available</p>';
            return;
        }

        grid.innerHTML = templates.map(template => `
            <div class="template-card">
                <span class="category">${template.category}</span>
                <h3>${template.name}</h3>
                <p>${template.description}</p>
                <button class="btn btn-primary" onclick="app.openFormModal('${template.id}')">
                    <i class="fas fa-edit"></i> Fill Form
                </button>
            </div>
        `).join('');
    }

    /**
     * Render form submissions
     */
    renderSubmissions(submissions) {
        const list = document.getElementById('submissionsList');
        if (!list) return;

        if (!submissions || submissions.length === 0) {
            list.innerHTML = '<p>No submissions yet. Start by filling out a form!</p>';
            return;
        }

        list.innerHTML = submissions.map(submission => `
            <div class="submission-item">
                <div class="item-info">
                    <h4>${submission.templateName}</h4>
                    <p>Submitted: ${new Date(submission.submittedAt).toLocaleDateString()}</p>
                    <span class="status-badge status-${submission.status}">${submission.status}</span>
                </div>
                <div class="item-actions">
                    <button onclick="app.viewSubmission('${submission.id}')" class="btn btn-secondary">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button onclick="app.deleteSubmission('${submission.id}')" class="btn" style="background-color: var(--danger-color); color: white;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render documents
     */
    renderDocuments(documents) {
        const list = document.getElementById('documentsList');
        if (!list) return;

        if (!documents || documents.length === 0) {
            list.innerHTML = '<p>No documents yet. Upload your first document!</p>';
            return;
        }

        list.innerHTML = documents.map(doc => `
            <div class="document-item">
                <div class="item-info">
                    <h4>${doc.title}</h4>
                    <p>${doc.description || 'No description'}</p>
                    <p style="font-size: 0.75rem;">Uploaded: ${new Date(doc.uploadedAt).toLocaleDateString()}</p>
                </div>
                <div class="item-actions">
                    <button onclick="app.shareDocument('${doc.id}')" class="btn btn-secondary">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button onclick="app.deleteDocument('${doc.id}')" class="btn" style="background-color: var(--danger-color); color: white;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Generate dynamic form fields
     */
    generateFormFields(template) {
        const form = document.getElementById('dynamicForm');
        if (!form) return;

        const fields = template.fields.map(field => {
            let inputHTML = '';

            switch (field.type) {
                case 'text':
                case 'email':
                case 'date':
                case 'number':
                    inputHTML = `<input type="${field.type}" id="field_${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>`;
                    break;
                
                case 'textarea':
                    inputHTML = `<textarea id="field_${field.id}" name="${field.id}" ${field.required ? 'required' : ''}></textarea>`;
                    break;
                
                case 'select':
                    const options = field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
                    inputHTML = `<select id="field_${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>
                        <option value="">-- Select --</option>
                        ${options}
                    </select>`;
                    break;
                
                default:
                    inputHTML = `<input type="text" id="field_${field.id}" name="${field.id}" ${field.required ? 'required' : ''}>`;
            }

            return `
                <div class="form-group">
                    <label for="field_${field.id}">
                        ${field.label}
                        ${field.required ? '<span style="color: var(--danger-color);">*</span>' : ''}
                    </label>
                    ${inputHTML}
                </div>
            `;
        }).join('');

        form.innerHTML = `
            ${fields}
            <button type="submit" class="btn btn-primary btn-block">
                <i class="fas fa-paper-plane"></i> Submit Form
            </button>
        `;
    }

    /**
     * Update user interface based on auth state
     */
    updateAuthUI(isLoggedIn, user = null) {
        const authSection = document.getElementById('authSection');
        const userSection = document.getElementById('userSection');

        if (isLoggedIn && user) {
            authSection.style.display = 'none';
            userSection.style.display = 'block';
            userSection.querySelector('.user-name').textContent = user.fullName || user.username;
        } else {
            authSection.style.display = 'flex';
            userSection.style.display = 'none';
        }
    }

    /**
     * Toggle loading state on button
     */
    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<span class="loading"></span> Loading...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || button.innerHTML;
        }
    }
}

// Create global UI instance
const ui = new UIService();
