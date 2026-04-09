# Panduan Lengkap - Bahasa Indonesia

Project ini adalah aplikasi manajemen formulir elektronik yang saya buat sebagai portfolio.

## Tech Stack

- Node.js + Express (backend)
- Vanilla JavaScript + HTML/CSS (frontend)
- JWT untuk authentication  
- In-memory storage (demo, siap diintegrate dengan database)

## Cara Jalanin di Lokal

```bash
git clone https://github.com/muammar-qathafi/electronic_form.git
cd electronic_form
npm install
copy .env.example .env
# Edit .env, ganti JWT_SECRET

npm run dev  # development
npm start    # production

# Buka: http://localhost:3000
```

## Struktur Project

```
src/          Backend
  controllers/    Handle requests
  routes/        API endpoints
  middleware/    JWT auth
  services/      Business logic

public/       Frontend
  js/          App logic
  css/         Styles
  index.html   Main page
```

## API Endpoints

Auth: /api/users/register, /api/users/login
Forms: /api/forms/templates, /api/forms/submit
Docs: /api/clouddocs/documents/upload, /api/clouddocs/documents

Detail lengkap: docs/API.md

## Kenapa Bikin Ini?  

Pengen portfolio full-stack yang:
- Real use case (form management)
- Clean code
- Well documented
- Bisa jadi talking point saat interview

## Untuk Production

Ganti in-memory dengan database (PostgreSQL/MongoDB) + proper env vars + HTTPS.

Auth system (JWT+bcrypt) udah production-ready.

---

MIT License | Built by Muammar Qathafi
