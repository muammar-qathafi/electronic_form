# Electronic Form Management System

A full-stack web application for managing digital forms with cloud document storage integration. Built as a portfolio project to demonstrate modern web development practices.

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3  
- **Auth**: JWT tokens
- **Storage**: In-memory (demo) - ready for PostgreSQL/MongoDB integration

## What it does

This is a form management system I built to handle common business workflows - think employee leave requests, IT support tickets, procurement forms, that kind of stuff. The cloud storage integration part is simulated for now, but the architecture is ready for real API integration.

Main features:
- User registration and login with JWT
- Dynamic form generation from templates
- Form submission and tracking
- Document management (simulated cloud storage integration)
- Mobile-responsive UI

## Getting Started

You'll need Node.js 14+ installed.

```bash
# Clone and install
git clone https://github.com/muammar-qathafi/electronic_form.git
cd electronic_form
npm install

# Setup environment
cp .env.example .env
# Edit .env with your settings (JWT secret, etc.)

# Run it
npm run dev  # development with auto-reload
npm start    # production

# Open browser at http://localhost:3000
```

That's it. The app uses in-memory storage by default, so you can test it right away.

## Project Structure

Pretty straightforward:
```
src/
├── controllers/    # Business logic
├── routes/        # API endpoints  
├── services/      # Cloud storage integration, validation
├── middleware/    # JWT auth
└── server.js      # Entry point

public/
├── css/          # Styles
├── js/           # Frontend logic
└── index.html    # Main page
```

## API Endpoints

Check out `docs/API.md` for detailed documentation. Here's the overview:

**Authentication** (`/api/users/`)
- POST `/register` - Create account
- POST `/login` - Get JWT token
- GET `/profile` - Get user info (protected)
- PUT `/profile` - Update user (protected)

**Forms** (`/api/forms/`)
- GET `/templates` - List available form templates
- POST `/submit` - Submit a form (protected)
- GET `/submissions` - Get your submissions (protected)
- DELETE `/submissions/:id` - Delete submission (protected)

**Cloud Documents** (`/api/clouddocs/`)
- POST `/documents/upload` - Upload document (protected)
- GET `/documents` - List your documents (protected)
- DELETE `/documents/:id` - Delete document (protected)
- POST `/documents/:id/share` - Share with others (protected)
- GET `/search` - Search documents (protected)

Protected routes need `Authorization: Bearer <token>` header.

## Development

```bash
npm run dev   # Start with nodemon (auto-reload)
npm test      # Run tests (sample tests included)
npm run lint  # Check code style
```

## Why I Built This

Wanted to create a practical full-stack project that shows:
- RESTful API design
- JWT authentication implementation  
- Frontend/backend integration
- Clean code organization
- Proper documentation

The form management concept came from real workplace needs - most companies still use manual processes for internal forms. This could actually be useful beyond just a portfolio piece.

## Security Note

Currently uses in-memory storage for demonstration. For production:
- Add real database (PostgreSQL recommended)
- Use environment variables for secrets
- Implement rate limiting
- Add HTTPS
- Enhance validation

The authentication system uses bcrypt for password hashing and JWT for sessions, which is prod-ready. Just need a proper database.

## Contributing

Found a bug? Have an idea? Feel free to open an issue or submit a PR. Check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## What's Next

Some ideas I'm considering:
- Real database integration (PostgreSQL)
- Form builder UI (drag-and-drop)
- Email notifications for form submissions
- Actual cloud storage API integration
- File attachments for forms
- Export to PDF
- Analytics dashboard

## License

MIT - feel free to use this for your own projects.

## Author

Built by Muammar Qathafi  
GitHub: [@muammar-qathafi](https://github.com/muammar-qathafi)

---

**Note**: This is primarily a portfolio/learning project. The cloud storage integration is simulated. If you want to use this in production, you'll need to integrate with real cloud storage APIs and add a proper database.
