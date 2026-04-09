# E-Form K-Link 📝

> A modern, full-stack electronic form management system with K-Link cloud integration

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🌟 Features

- **📋 Dynamic Form Management** - Create and manage electronic forms with ease
- **☁️ K-Link Integration** - Seamless document management with K-Link cloud storage
- **🔐 User Authentication** - Secure JWT-based authentication system
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **⚡ Modern Tech Stack** - Built with Node.js, Express, and vanilla JavaScript
- **🎨 Clean UI** - Beautiful, intuitive interface with smooth interactions
- **📄 Multiple Templates** - Pre-built form templates for common use cases

## 🚀 Quick Start

### Prerequisites

- Node.js 14 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muammar-qathafi/electronic_form.git
   cd electronic_form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your settings:
   - Database credentials
   - JWT secret key
   - K-Link API credentials (if available)
   - Other environment-specific settings

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📖 Documentation

### Project Structure

```
e-form-k-link/
├── src/                    # Backend source code
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── server.js          # Application entry point
├── public/                # Frontend files
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── index.html        # Main HTML file
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── LICENSE              # MIT License
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

### API Endpoints

#### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)
- `POST /api/users/logout` - Logout user (requires auth)

#### Forms

- `GET /api/forms/templates` - Get all form templates
- `GET /api/forms/templates/:id` - Get specific template
- `POST /api/forms/submit` - Submit a form (requires auth)
- `GET /api/forms/submissions` - Get user submissions (requires auth)
- `GET /api/forms/submissions/:id` - Get specific submission (requires auth)
- `PUT /api/forms/submissions/:id` - Update submission (requires auth)
- `DELETE /api/forms/submissions/:id` - Delete submission (requires auth)
- `POST /api/forms/validate` - Validate form data

#### K-Link Documents

- `POST /api/klink/documents/upload` - Upload document (requires auth)
- `GET /api/klink/documents` - Get user documents (requires auth)
- `GET /api/klink/documents/:id` - Get specific document (requires auth)
- `DELETE /api/klink/documents/:id` - Delete document (requires auth)
- `POST /api/klink/documents/:id/share` - Share document (requires auth)
- `GET /api/klink/search` - Search documents (requires auth)

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🛠️ Development

### Running Tests

```bash
npm test
```

### Code Linting

```bash
npm run lint
```

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic reloading on file changes.

## 🎯 Use Cases

This system is perfect for:

- **HR Departments** - Employee leave requests, onboarding forms
- **IT Teams** - Support ticket management, access requests
- **Procurement** - Purchase requests, vendor management
- **General Administration** - Any form-based workflow

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Environment-based configuration
- Secure file upload handling

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | Secret key for JWT | (required) |
| `KLINK_API_URL` | K-Link API endpoint | - |
| `KLINK_API_KEY` | K-Link API key | - |
| `MAX_FILE_SIZE` | Maximum upload size | 10485760 |
| `ALLOWED_ORIGINS` | CORS allowed origins | * |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muammar Qathafi**

- GitHub: [@muammar-qathafi](https://github.com/muammar-qathafi)
- Repository: [electronic_form](https://github.com/muammar-qathafi/electronic_form)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by real-world form management needs
- Created as a portfolio project to demonstrate full-stack development skills

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](#-documentation)
2. Open an [issue](https://github.com/muammar-qathafi/electronic_form/issues)

## 🗺️ Roadmap

- [ ] Add real database integration (PostgreSQL/MongoDB)
- [ ] Implement form builder UI
- [ ] Add email notifications
- [ ] Implement real K-Link API integration
- [ ] Add file attachment support
- [ ] Multi-language support
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Note**: This is a portfolio/demonstration project. The K-Link integration is simulated. For production use, integrate with actual K-Link API endpoints and implement a real database system.
