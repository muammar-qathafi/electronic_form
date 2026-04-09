#!/bin/bash

echo "================================================"
echo " Electronic Form - GitHub Upload Script"
echo "================================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed!"
    echo ""
    echo "Please install Git first:"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo "  macOS: brew install git"
    echo ""
    exit 1
fi

echo "[1/6] Initializing Git repository..."
git init || exit 1

echo ""
echo "[2/6] Adding all files..."
git add . || exit 1

echo ""
echo "[3/6] Creating initial commit..."
git commit -m "Initial commit: Electronic Form K-Link System" || exit 1

echo ""
echo "[4/6] Adding remote repository..."
git remote add origin https://github.com/muammar-qathafi/electronic_form.git 2>/dev/null || echo "Remote already exists, skipping..."

echo ""
echo "[5/6] Setting branch to main..."
git branch -M main || exit 1

echo ""
echo "[6/6] Pushing to GitHub..."
echo "You may be asked to login to GitHub."
git push -u origin main || exit 1

echo ""
echo "================================================"
echo " SUCCESS! Project uploaded to GitHub!"
echo "================================================"
echo ""
echo "Repository: https://github.com/muammar-qathafi/electronic_form"
echo ""
echo "Next steps:"
echo "1. Visit your repository on GitHub"
echo "2. Update repository description"
echo "3. Add topics: nodejs, express, javascript, portfolio"
echo "4. Deploy your app (see docs/DEPLOYMENT.md)"
echo ""
