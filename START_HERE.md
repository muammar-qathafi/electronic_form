# Quick Start Guide

Project ini udah hampir siap. Tinggal beberapa langkah lagi.

## Setup Lokal

```bash
npm install
copy .env.example .env
# Edit .env, ganti JWT_SECRET dengan string random

npm run dev
# Buka http://localhost:3000
```

## Struktur

```
src/              Backend (Express + JWT)
  controllers/    Request handlers
  routes/         API endpoints
  middleware/     Auth check
  services/       Business logic

public/           Frontend (vanilla JS)
  js/api.js       API calls  
  js/ui.js        DOM manipulation
  js/app.js       Main app
```

## Tech Stack

Node + Express + JWT untuk backend. Frontend vanilla JavaScript tanpa framework. Demo pake in-memory storage, tinggal ganti ke PostgreSQL/MongoDB untuk production.

## Testing

Register akun baru → Login → Pilih template form → Submit. Ada 3 template: Employee Leave, Purchase Request, IT Support.

Cloud storage feature masih simulated, tapi arsitekturnya udah siap untuk integration API real.

---

Built by Muammar Qathafi | Portfolio Project
