# Laravel Fast Boot - Quick Start Guide

Get your Laravel project up and running in minutes! 🚀

## 📋 Before You Begin

### Install Prerequisites

#### Required
1. **PHP 8.1+**
   ```bash
   # macOS (using Homebrew)
   brew install php
   
   # Ubuntu/Debian
   sudo apt install php php-cli php-mbstring php-xml
   
   # Windows
   # Download from https://windows.php.net/download/
   ```

2. **Composer**
   ```bash
   # macOS/Linux
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   
   # Windows
   # Download from https://getcomposer.org/download/
   ```

#### Optional (but recommended)
3. **Node.js** (for frontend assets)
   ```bash
   # macOS
   brew install node
   
   # Ubuntu/Debian
   sudo apt install nodejs npm
   
   # Windows
   # Download from https://nodejs.org/
   ```

4. **Docker** (for Laravel Sail)
   - macOS: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

## 🎯 3-Minute Setup

### Step 1: Clone a Laravel Project
```bash
git clone https://github.com/yourusername/your-laravel-project
cd your-laravel-project
```

### Step 2: Open in VS Code
```bash
code .
```

### Step 3: Run Laravel Fast Boot
One of three ways:

**Option A: Command Palette**
- Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Laravel: Run First Setup"
- Press Enter

**Option B: Status Bar**
- Look for "🚀 Setup Laravel" in the bottom-left status bar
- Click it

**Option C: Context Menu**
- Right-click on `composer.json` in the Explorer
- Select "Setup Laravel Project"

### Step 4: Follow the Wizard
The wizard will guide you through:

1. ✅ **Prerequisite Check** - Automatically verifies your system
2. ✅ **Confirm Setup** - Click "Yes" to continue
3. 📄 **Environment File** - Creates `.env` from `.env.example`
4. 🐳 **Laravel Sail** - Choose Docker or local PHP
5. 🗄️ **Database Config** - Configure your database:
   - Select type (MySQL, PostgreSQL, SQLite, SQL Server)
   - Enter connection details
6. 📦 **Dependencies** - Installs Composer and NPM packages
7. 🔑 **App Key** - Generates secure application key
8. 🗃️ **Migrations** - Optionally run database migrations
9. ✨ **Done!** - Your Laravel project is ready!

### Step 5: Start Development Server
When prompted, click "Start Server" or run:
```bash
php artisan serve
```

Visit: http://localhost:8000

## 🎨 Common Scenarios

### Scenario 1: MySQL Database
```
Database Type: MySQL
Host: localhost
Port: 3306
Database: my_laravel_db
Username: root
Password: [your-password]
```

### Scenario 2: SQLite Database (Easiest)
```
Database Type: SQLite
Database: database.sqlite
(No host/port/username needed!)
```

### Scenario 3: PostgreSQL Database
```
Database Type: PostgreSQL
Host: 127.0.0.1
Port: 5432
Database: my_laravel_db
Username: postgres
Password: [your-password]
```

### Scenario 4: Using Laravel Sail (Docker)
1. Choose "Yes, use Laravel Sail" when prompted
2. Wait for dependencies to install
3. Start with: `./vendor/bin/sail up`
4. Access at: http://localhost

## 🔧 Post-Setup Tasks

### Run Migrations
```bash
php artisan migrate
```
Or use VS Code task: `Terminal > Run Task > Laravel: Artisan migrate`

### Seed Database
```bash
php artisan db:seed
```
Or use VS Code task: `Terminal > Run Task > Laravel: Artisan db:seed`

### Start Frontend Dev Server
```bash
npm run dev
```
Or use VS Code task: `Terminal > Run Task > Laravel: NPM Dev`

## 📋 Available VS Code Tasks

Access via `Terminal > Run Task...` or `Cmd+Shift+B`:

- **Laravel: Serve** - Start development server
- **Laravel: Sail Up** - Start Docker environment
- **Laravel: Composer Install** - Install PHP dependencies
- **Laravel: NPM Install** - Install Node dependencies
- **Laravel: NPM Dev** - Start Vite dev server
- **Laravel: Artisan migrate** - Run migrations
- **Laravel: Artisan migrate:fresh** - Fresh migration
- **Laravel: Artisan db:seed** - Seed database

## 🆘 Troubleshooting

### "composer.json not found"
**Solution**: Make sure you're in a Laravel project directory with `composer.json` in the root.

### "This does not appear to be a Laravel project"
**Solution**: The `composer.json` must include `laravel/framework` as a dependency.

### "Missing prerequisites: PHP, Composer"
**Solution**: Install PHP and Composer following the instructions above.

### Composer install fails
**Common causes**:
- No internet connection
- Composer memory limit too low
- Missing PHP extensions

**Solutions**:
```bash
# Increase Composer memory limit
php -d memory_limit=-1 /path/to/composer install

# Check PHP extensions
php -m
```

### NPM install fails
**Solution**: Ensure Node.js and NPM are installed:
```bash
node --version
npm --version
```

### Key generation fails
**Solution**: Ensure `artisan` file exists and is executable:
```bash
chmod +x artisan
```

### Migration fails
**Common causes**:
- Database doesn't exist
- Wrong credentials
- Database server not running

**Solutions**:
```bash
# Create database first
mysql -u root -p
CREATE DATABASE my_laravel_db;
exit;

# Or for PostgreSQL
psql -U postgres
CREATE DATABASE my_laravel_db;
\q
```

### "Cannot connect to Docker"
**Solution**: 
- Start Docker Desktop (macOS/Windows)
- Start Docker service (Linux):
  ```bash
  sudo systemctl start docker
  ```

## 📚 Next Steps

After setup, you might want to:

1. **Configure Authentication**
   ```bash
   php artisan make:auth
   ```

2. **Create Models and Migrations**
   ```bash
   php artisan make:model Post -m
   ```

3. **Create Controllers**
   ```bash
   php artisan make:controller PostController --resource
   ```

4. **Set Up Queues**
   ```bash
   php artisan queue:table
   php artisan migrate
   php artisan queue:work
   ```

5. **Configure Mail**
   - Update `.env` with mail settings
   - Test with `php artisan tinker` and `Mail::raw('Test', ...)`

## 🎓 Learning Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Laracasts](https://laracasts.com) - Video tutorials
- [Laravel News](https://laravel-news.com) - Latest updates
- [Laravel Daily](https://laraveldaily.com) - Tips and tricks

## 💡 Pro Tips

1. **Use SQLite for Development**
   - No database server needed
   - Perfect for quick testing
   - Easy to reset

2. **Laravel Sail for Teams**
   - Consistent environment across team
   - No local PHP/MySQL installation needed
   - Docker Compose-based

3. **Use Tasks for Common Commands**
   - Faster than typing commands
   - Memorize keyboard shortcuts
   - Accessible via `Cmd+Shift+B`

4. **Check Output Logs**
   - View detailed logs: `Cmd+Shift+U` → "Laravel Fast Boot"
   - Helps debug issues
   - See what commands were run

5. **Re-run Setup Anytime**
   - Safe to run multiple times
   - Can update database config
   - Useful after `git pull`

## ⚡ Speed Tips

### Skip Optional Steps
- Answer "No" to NPM install if not using frontend
- Skip migrations if database not ready
- Choose SQLite to avoid database setup

### Use Defaults
- Press Enter to accept default values
- Most defaults are sensible for development

### Parallel Installation
- While Composer runs, you can prepare your database
- Open another terminal and create database manually

## 🎉 That's It!

You're now ready to build amazing Laravel applications!

**Need help?** 
- Check [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
- Read [TESTING.md](TESTING.md) for troubleshooting
- Open an issue on GitHub

**Happy coding!** 🚀
