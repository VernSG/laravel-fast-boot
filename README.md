# Laravel Fast Boot

[![Version](https://img.shields.io/visual-studio-marketplace/v/YourPublisher.laravel-fast-boot)](https://marketplace.visualstudio.com/items?itemName=YourPublisher.laravel-fast-boot)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/YourPublisher.laravel-fast-boot)](https://marketplace.visualstudio.com/items?itemName=YourPublisher.laravel-fast-boot)

> **Enterprise-grade VS Code extension for bootstrapping Laravel projects with Clean Code and SOLID principles.**

Laravel Fast Boot is a production-ready Visual Studio Code extension that serves as an on-demand wizard to bootstrap and setup fresh Laravel projects immediately after cloning. It streamlines the entire setup process with an intuitive guided workflow.

## 🎥 Video Showcase

<video src="/images/showcase.mp4" width="100%" controls>
    Your browser does not support the video tag. <a href="/images/showcase.mp4">Download the video</a>
</video>

*Watch how Laravel Fast Boot streamlines your Laravel project setup in seconds!*

## Features

- **Intelligent Setup Wizard**: Step-by-step guided setup process
- **Prerequisite Checking**: Automatically detects PHP, Composer, Node.js, and Docker
- **Environment Configuration**: Smart .env file management
- **Database Wizard**: Interactive database configuration with support for:
  - MySQL
  - PostgreSQL
  - SQLite
  - SQL Server
- **Laravel Sail Support**: Optional Docker-based development environment
- **Dependency Management**: Automated Composer and NPM installations
- **Application Key Generation**: Secure key generation
- **Database Migrations**: Optional migration execution
- **VS Code Task Integration**: Pre-configured tasks for common Laravel commands
- **Cross-Platform**: Full support for Windows, macOS, and Linux

## 📋 Prerequisites

### Required
- **PHP** 8.1 or higher
- **Composer** 2.0 or higher

### Optional
- **Node.js** 16.0 or higher (for frontend assets)
- **Docker** (for Laravel Sail)

## 🎯 How to Use

### Method 1: Command Palette
1. Open your Laravel project in VS Code
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Laravel: Run First Setup" and press Enter
4. Follow the guided wizard

### Method 2: Status Bar
1. Open your Laravel project in VS Code
2. Click the "🚀 Setup Laravel" button in the status bar (bottom-left)
3. Follow the guided wizard

### Method 3: Context Menu
1. Right-click on `composer.json` in the Explorer
2. Select "Setup Laravel Project"
3. Follow the guided wizard

## 🧙 Setup Wizard Steps

The setup wizard will guide you through the following steps:

1. **Workspace Validation**: Verifies you're in a Laravel project
2. **Prerequisite Check**: Checks for PHP, Composer, Node.js, and Docker
3. **Environment Setup**: Copies `.env.example` to `.env` (or keeps existing)
4. **Laravel Sail Configuration**: Choose between local PHP or Docker (Laravel Sail)
5. **Database Configuration**: Configure your database connection
   - Connection type (MySQL, PostgreSQL, SQLite, SQL Server)
   - Host and port
   - Database name
   - Credentials
6. **Dependency Installation**: Install Composer and NPM dependencies
7. **Application Key**: Generate secure application key
8. **Database Migrations**: Optionally run migrations
9. **Task Registration**: Register VS Code tasks for common Laravel commands
10. **Application Optimization**: Clear caches and optimize

## 📦 Available VS Code Tasks

After setup, the following tasks are automatically registered:

- **Laravel: Serve** - Start the Laravel development server
- **Laravel: Sail Up** - Start Laravel Sail (Docker)
- **Laravel: Composer Install** - Install Composer dependencies
- **Laravel: NPM Install** - Install NPM dependencies
- **Laravel: NPM Dev** - Start Vite development server
- **Laravel: Artisan migrate** - Run database migrations
- **Laravel: Artisan migrate:fresh** - Fresh database migration
- **Laravel: Artisan db:seed** - Seed the database

Access these tasks via `Terminal > Run Task...` or `Cmd+Shift+B`.

## 🏗️ Architecture

This extension follows enterprise-grade software architecture principles:

### Clean Code Principles
- Readable and maintainable code
- Comprehensive documentation
- Self-documenting functions

### SOLID Principles
- **S**ingle Responsibility Principle: Each service has one responsibility
- **O**pen/Closed Principle: Open for extension, closed for modification
- **L**iskov Substitution Principle: Proper inheritance hierarchies
- **I**nterface Segregation Principle: Focused interfaces
- **D**ependency Inversion Principle: Dependency injection throughout

### Service-Oriented Architecture
```
src/
├── extension.ts           # Entry point and DI container
├── controllers/
│   └── SetupController.ts # Orchestrates the flow
├── services/
│   ├── PrerequisiteService.ts
│   ├── EnvService.ts
│   ├── DatabaseWizard.ts
│   └── ExecutionService.ts
├── factories/
│   └── TaskFactory.ts
├── utils/
│   └── Logger.ts
└── interfaces/
    └── index.ts
```

## 🔧 Extension Settings

This extension does not require any configuration. It works out of the box!

## 📝 Output Channel

All operations are logged to the "Laravel Fast Boot" output channel. View logs:
1. Open the Output panel (`Cmd+Shift+U` or `Ctrl+Shift+U`)
2. Select "Laravel Fast Boot" from the dropdown

## 🐛 Known Issues

None at this time. Please report issues on our [GitHub repository](https://github.com/yourusername/laravel-fast-boot/issues).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Laravel Framework Team
- VS Code Extension API Documentation
- The Laravel Community

## 📚 Resources

### Documentation
- [Quick Start Guide](docs/QUICKSTART.md) - Get started in 3 minutes
- [Developer Documentation](docs/DEVELOPMENT.md) - Architecture and code standards
- [Testing Guide](docs/TESTING.md) - Comprehensive testing procedures
- [Installation Guide](docs/INSTALL.md) - Installation and publishing
- [Project Summary](docs/PROJECT_SUMMARY.md) - Complete project overview

### External Resources
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sail Documentation](https://laravel.com/docs/sail)
- [VS Code Extension Development](https://code.visualstudio.com/api)

##  Release Notes

### 1.0.0 (Initial Release)

#### Features
- ✅ Complete Laravel project setup wizard
- ✅ Prerequisite checking (PHP, Composer, Node.js, Docker)
- ✅ Environment file management
- ✅ Database configuration wizard
- ✅ Laravel Sail support
- ✅ Dependency installation (Composer & NPM)
- ✅ Application key generation
- ✅ Database migrations
- ✅ VS Code task integration
- ✅ Comprehensive logging
- ✅ Cross-platform support

---

**Enjoy bootstrapping your Laravel projects!** 🚀
