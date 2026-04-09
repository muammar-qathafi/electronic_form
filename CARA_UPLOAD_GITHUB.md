# Panduan Upload ke GitHub

## ⚠️ Git Belum Terinstall

Git belum terinstall di komputer Anda. Ikuti langkah-langkah berikut:

## Langkah 1: Install Git

### Download Git
1. Kunjungi: https://git-scm.com/download/win
2. Download Git untuk Windows
3. Install dengan pengaturan default (tinggal klik Next)
4. Restart Command Prompt atau PowerShell setelah instalasi

### Verifikasi Instalasi
Buka PowerShell atau Command Prompt baru, ketik:
```bash
git --version
```

Jika muncul versi Git, berarti instalasi berhasil.

## Langkah 2: Konfigurasi Git (Pertama Kali)

```bash
# Set nama Anda
git config --global user.name "Muammar Qathafi"

# Set email Anda (gunakan email yang sama dengan GitHub)
git config --global user.email "your.email@example.com"
```

## Langkah 3: Upload Project ke GitHub

### A. Cara Otomatis (Via Command Line)

Buka PowerShell atau Git Bash di folder project ini, lalu jalankan:

```bash
# Masuk ke folder project
cd c:\laragon\www\git_publish_e-form_k-link

# Initialize Git repository
git init

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit: Electronic Form System"

# Tambahkan remote repository
git remote add origin https://github.com/muammar-qathafi/electronic_form.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

### B. Cara Manual (Via GitHub Desktop)

1. **Download GitHub Desktop**
   - Kunjungi: https://desktop.github.com/
   - Install aplikasi

2. **Login ke GitHub**
   - Buka GitHub Desktop
   - Login dengan akun GitHub Anda

3. **Add Repository**
   - File → Add Local Repository
   - Pilih folder: `c:\laragon\www\git_publish_e-form_k-link`
   - Jika muncul "This directory does not appear to be a Git repository", klik "create a repository"

4. **Commit Changes**
   - Tulis commit message: "Initial commit: Electronic Form System"
   - Klik "Commit to main"

5. **Publish Repository**
   - Klik "Publish repository"
   - Pastikan nama repository: `electronic_form`
   - Klik "Publish Repository"

### C. Cara Upload Manual (Via Web Browser)

1. **Buka GitHub Repository**
   - Buka: https://github.com/muammar-qathafi/electronic_form

2. **Upload Files**
   - Klik "Add file" → "Upload files"
   - Drag & drop semua file dan folder dari `c:\laragon\www\git_publish_e-form_k-link`
   - Tulis commit message: "Initial commit"
   - Klik "Commit changes"

## Langkah 4: Update Informasi Personal

Sebelum upload, edit file-file berikut:

### 1. README.md
Ganti:
- `Your Name` → `Muammar Qathafi`
- `@yourusername` → `@muammar-qathafi`
- `https://github.com/yourusername/electronic-form` → `https://github.com/muammar-qathafi/electronic_form`
- Update email dan link portfolio Anda

### 2. package.json
Ganti:
```json
{
  "name": "electronic-form",
  "author": "Muammar Qathafi",
  "repository": {
    "type": "git",
    "url": "https://github.com/muammar-qathafi/electronic_form.git"
  }
}
```

### 3. LICENSE
Ganti:
```
Copyright (c) 2026 Muammar Qathafi
```

### 4. CONTRIBUTING.md & SECURITY.md
Update email kontak Anda

## Troubleshooting

### Error: "Permission denied (publickey)"

Anda perlu setup SSH key:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy SSH key
cat ~/.ssh/id_ed25519.pub
```

Kemudian:
1. Buka GitHub → Settings → SSH and GPG keys
2. Klik "New SSH key"
3. Paste SSH key yang di-copy
4. Save

### Error: "Repository not found"

Pastikan repository sudah dibuat di GitHub:
1. Buka https://github.com/muammar-qathafi
2. Klik "New repository"
3. Nama: `electronic_form`
4. Jangan centang "Initialize with README"
5. Create repository

### Error: "Authentication failed"

Gunakan Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Pilih scopes: `repo`, `workflow`
4. Copy token
5. Saat diminta password, paste token (bukan password GitHub)

## Setelah Upload

### 1. Cek Repository
Buka: https://github.com/muammar-qathafi/electronic_form

### 2. Update README (jika ada yang ketinggalan)
Edit README.md langsung di GitHub

### 3. Tambahkan Topics
Di GitHub repository:
- Klik ⚙️ (Settings) di sebelah About
- Tambahkan topics: `nodejs`, `express`, `javascript`, `portfolio`, `e-form`

### 4. Buat README Lebih Menarik
Tambahkan badges di bagian atas README.md:

```markdown
[![GitHub](https://img.shields.io/github/stars/muammar-qathafi/electronic_form?style=social)](https://github.com/muammar-qathafi/electronic_form)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
```

### 5. Deploy (Opsional tapi Recommended!)
Deploy aplikasi agar bisa diakses online:
- **Heroku**: https://www.heroku.com (gratis)
- **Railway**: https://railway.app (gratis)
- **Render**: https://render.com (gratis)

Lihat file `docs/DEPLOYMENT.md` untuk panduan lengkap.

## Quick Command Reference

```bash
# Clone (download) repository
git clone https://github.com/muammar-qathafi/electronic_form.git

# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Check remote
git remote -v
```

## Kontak
Jika ada pertanyaan, silakan:
1. Cek dokumentasi lengkap di folder `docs/`
2. Baca PANDUAN_INDONESIA.md
3. Open issue di GitHub repository

---

**Good Luck!** 🚀

Setelah upload, repository Anda siap untuk:
✅ Ditampilkan di portfolio
✅ Dibagikan ke recruiter
✅ Di-deploy ke hosting
✅ Dikembangkan lebih lanjut
