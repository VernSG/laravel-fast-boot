# Laravel Fast Boot

[![Version](https://img.shields.io/visual-studio-marketplace/v/MuhammadYusuf.laravel-fast-boot)](https://marketplace.visualstudio.com/items?itemName=MuhammadYusuf.laravel-fast-boot)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/MuhammadYusuf.laravel-fast-boot)](https://marketplace.visualstudio.com/items?itemName=MuhammadYusuf.laravel-fast-boot)

**Stop wasting time on repetitive Laravel project setup.**

Laravel Fast Boot is a VS Code extension that automates the entire onboarding process after you clone a Laravel project. One command replaces 15+ manual steps: copying `.env`, configuring databases, installing dependencies, generating keys, running migrations, and setting up Docker.

## Why This Extension?

**The Problem:**  
Every time you clone a Laravel project, you repeat the same tedious setup:
- Copy `.env.example` to `.env`
- Configure database credentials
- Run `composer install`
- Run `npm install`
- Generate application key
- Set up Laravel Sail or local environment
- Run migrations
- Clear caches

**The Solution:**  
Run one command. Answer a few questions. Get a fully configured Laravel project ready to code in under 2 minutes.

## 🎥 See It In Action

[![Watch Demo](/images/icon.png)](https://youtu.be/ydcQflW4R2s?si=odURh4FQB16a3-x8)

*Click to watch the 2-minute demo*

## What It Does

**Automates Everything:**
- ✅ Creates `.env` file automatically (even if `.env.example` is missing)
- ✅ Detects installed tools (PHP, Composer, Node.js, Docker)
- ✅ Configures database connections through an interactive wizard (MySQL, PostgreSQL, SQLite, SQL Server)
- ✅ Installs Composer and NPM dependencies with progress tracking
- ✅ Generates secure application keys
- ✅ Sets up Laravel Sail for Docker environments
- ✅ Runs database migrations on demand
- ✅ Registers common Laravel tasks in VS Code (serve, migrate, tinker, etc.)
- ✅ Works on Windows, macOS, and Linux

## 📋 Prerequisites

### Required
- **PHP** 8.1 or higher
- **Composer** 2.0 or higher

### Optional
- **Node.js** 16.0 or higher (for frontend assets)
- **Docker** (for Laravel Sail)

## How to Use

**Three ways to start:**

1. **Command Palette**: Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Win/Linux) → Type "Laravel: Run First Setup"
2. **Status Bar**: Click the "🚀 Setup Laravel" button in the bottom-left corner
3. **Context Menu**: Right-click `composer.json` → Select "Setup Laravel Project"

**What happens next:**

The wizard walks you through 10 automated steps:

1. Validates you're in a Laravel project
2. Checks for PHP, Composer, Node.js, and Docker
3. Creates or preserves your `.env` file
4. Asks if you want Docker (Laravel Sail) or local PHP
5. Configures database connection (type, host, credentials)
6. Installs Composer dependencies
7. Installs NPM dependencies (optional)
8. Generates application key
9. Runs database migrations (optional)
10. Registers VS Code tasks for common commands

Total time: **~2 minutes** (depending on internet speed)

## Available Tasks

After setup, these tasks are registered in VS Code (access via `Terminal > Run Task...` or `Cmd+Shift+B`):

- **Laravel: Serve** - Start development server
- **Laravel: Sail Up** - Start Docker environment
- **Laravel: Composer Install** - Install PHP dependencies
- **Laravel: NPM Install** - Install JavaScript dependencies
- **Laravel: NPM Dev** - Start Vite dev server
- **Laravel: Artisan migrate** - Run database migrations
- **Laravel: Artisan migrate:fresh** - Fresh migration
- **Laravel: Artisan db:seed** - Seed database

## Development

Built with TypeScript and follows modular service architecture. See [Developer Documentation](docs/DEVELOPMENT.md) for details.

## Troubleshooting

View logs in the Output panel (`Cmd+Shift+U` / `Ctrl+Shift+U`) → select "Laravel Fast Boot" from the dropdown.

Report issues: [GitHub Issues](https://github.com/yourusername/laravel-fast-boot/issues)

## Resources

- [Quick Start Guide](docs/QUICKSTART.md)
- [Developer Documentation](docs/DEVELOPMENT.md)
- [Testing Guide](docs/TESTING.md)

## License

MIT License - see [LICENSE](LICENSE) file.

---

**Stop wasting time. Start building.** 🚀
