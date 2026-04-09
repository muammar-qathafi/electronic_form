# Deployment Guide

This guide will help you deploy the E-Form application to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Deployment Options](#deployment-options)
  - [Heroku](#heroku)
  - [Railway](#railway)
  - [DigitalOcean](#digitalocean)
  - [AWS](#aws)
  - [Azure](#azure)
  - [Self-Hosted](#self-hosted)

## Prerequisites

Before deploying, ensure you have:

- Node.js 14+ installed
- Git installed
- A hosting account (Heroku, Railway, etc.)
- Database credentials (if using external database)

## Environment Setup

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```

2. **Configure production variables**
   ```env
   NODE_ENV=production
   PORT=3000
   
   # Generate a secure JWT secret
   JWT_SECRET=your_super_secure_random_string_here
   
   # Database
   DB_HOST=your-db-host
   DB_PORT=5432
   DB_NAME=eform_production
   DB_USER=your-db-user
   DB_PASS=your-db-password
   
   # Cloud Storage API (if available)
   CLOUD_STORAGE_API_URL=https://api.example.com
   CLOUD_STORAGE_API_KEY=your-api-key
   
   # CORS
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

3. **Generate Secure JWT Secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

## Database Setup

### Option 1: PostgreSQL

1. Install PostgreSQL client
   ```bash
   npm install pg
   ```

2. Create database schema
   ```sql
   CREATE DATABASE eform_production;
   
   CREATE TABLE users (
     id UUID PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     full_name VARCHAR(100),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE form_submissions (
     id UUID PRIMARY KEY,
     template_id VARCHAR(50) NOT NULL,
     template_name VARCHAR(100) NOT NULL,
     user_id UUID REFERENCES users(id),
     data JSONB NOT NULL,
     status VARCHAR(20) DEFAULT 'pending',
     submitted_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE documents (
     id UUID PRIMARY KEY,
     cloud_docs_id VARCHAR(100),
     title VARCHAR(200) NOT NULL,
     description TEXT,
     content TEXT,
     metadata JSONB,
     user_id UUID REFERENCES users(id),
     shared_with UUID[],
     status VARCHAR(20) DEFAULT 'active',
     uploaded_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Option 2: MongoDB

1. Install MongoDB client
   ```bash
   npm install mongodb mongoose
   ```

2. Update connection code to use MongoDB

## Deployment Options

### Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret
   # Set other variables...
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Open app**
   ```bash
   heroku open
   ```

### Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize project**
   ```bash
   railway init
   ```

4. **Add environment variables**
   - Go to Railway dashboard
   - Select your project
   - Add variables in the Variables tab

5. **Deploy**
   ```bash
   railway up
   ```

### DigitalOcean

1. **Create Droplet**
   - Choose Ubuntu 20.04
   - Select appropriate size
   - Add SSH key

2. **SSH into Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2**
   ```bash
   npm install -g pm2
   ```

5. **Clone repository**
   ```bash
   git clone https://github.com/muammar-qathafi/electronic_form.git
   cd electronic_form
   ```

6. **Install dependencies**
   ```bash
   npm install --production
   ```

7. **Set up environment variables**
   ```bash
   nano .env
   # Add your production variables
   ```

8. **Start with PM2**
   ```bash
   pm2 start src/server.js --name eform-app
   pm2 startup
   pm2 save
   ```

9. **Set up Nginx (optional)**
   ```bash
   sudo apt-get install nginx
   
   # Create Nginx config
   sudo nano /etc/nginx/sites-available/eform-app
   ```

   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/eform-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Set up SSL with Certbot**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com
    ```

### AWS (Elastic Beanstalk)

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB application**
   ```bash
   eb init
   ```

3. **Create environment**
   ```bash
   eb create production
   ```

4. **Set environment variables**
   ```bash
   eb setenv NODE_ENV=production JWT_SECRET=your-secret
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

### Azure (App Service)

1. **Install Azure CLI**
   ```bash
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

2. **Login**
   ```bash
   az login
   ```

3. **Create resource group**
   ```bash
   az group create --name eform-rg --location eastus
   ```

4. **Create App Service plan**
   ```bash
   az appservice plan create --name eform-plan --resource-group eform-rg --sku B1 --is-linux
   ```

5. **Create web app**
   ```bash
   az webapp create --resource-group eform-rg --plan eform-plan --name eform-app --runtime "NODE|18-lts"
   ```

6. **Configure deployment**
   ```bash
   az webapp deployment source config-local-git --name eform-app --resource-group eform-rg
   ```

7. **Set environment variables**
   ```bash
   az webapp config appsettings set --resource-group eform-rg --name eform-app --settings NODE_ENV=production JWT_SECRET=your-secret
   ```

### Self-Hosted (VPS)

1. **Prepare server**
   - Ubuntu/Debian based system
   - Minimum 1GB RAM
   - Node.js 14+

2. **Security hardening**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Set up firewall
   sudo ufw allow OpenSSH
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   
   # Create non-root user
   adduser nodeapp
   usermod -aG sudo nodeapp
   ```

3. **Follow DigitalOcean steps** above for the rest

## Post-Deployment

1. **Verify deployment**
   - Check health endpoint: `https://yourdomain.com/api/health`
   - Test login functionality
   - Test form submission

2. **Set up monitoring**
   - Use PM2 monitoring: `pm2 monit`
   - Set up application monitoring (New Relic, DataDog, etc.)
   - Configure error tracking (Sentry, Rollbar, etc.)

3. **Set up backups**
   - Database backups (daily)
   - File storage backups
   - Configuration backups

4. **Performance optimization**
   - Enable compression
   - Set up caching (Redis)
   - Configure CDN for static assets
   - Enable HTTP/2

## Troubleshooting

### Application won't start

- Check logs: `pm2 logs` or `heroku logs --tail`
- Verify environment variables
- Check Node.js version compatibility
- Ensure all dependencies are installed

### Database connection errors

- Verify database credentials
- Check database server is accessible
- Ensure firewall allows database port
- Verify SSL requirements

### CORS errors

- Update `ALLOWED_ORIGINS` in environment variables
- Ensure proper protocol (http/https)
- Check for trailing slashes in URLs

## Scaling

### Horizontal Scaling

1. **Use load balancer**
   - AWS ELB
   - Nginx load balancer
   - CloudFlare

2. **Session management**
   - Use Redis for session store
   - Implement stateless authentication (JWT)

3. **Database scaling**
   - Read replicas
   - Connection pooling
   - Query optimization

### Vertical Scaling

- Increase server resources
- Optimize code performance
- Enable caching layers

## Maintenance

1. **Regular updates**
   ```bash
   npm update
   npm audit fix
   ```

2. **Log rotation**
   ```bash
   pm2 install pm2-logrotate
   ```

3. **Health checks**
   - Set up automated health checks
   - Monitor response times
   - Track error rates

---

For more help, consult the [README.md](../README.md) or open an issue on GitHub.
