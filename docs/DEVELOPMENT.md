# Laravel Fast Boot - Developer Documentation

## 📚 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Development Setup](#development-setup)
5. [Testing](#testing)
6. [Building and Publishing](#building-and-publishing)
7. [Code Standards](#code-standards)

## 🏗️ Architecture Overview

Laravel Fast Boot follows enterprise-grade software architecture principles:

### Clean Code Principles
- **Readability**: Self-documenting code with clear naming conventions
- **Maintainability**: Modular design with single responsibilities
- **Documentation**: Comprehensive JSDoc comments

### SOLID Principles

#### Single Responsibility Principle (SRP)
Each class has one, and only one, reason to change:
- `PrerequisiteService` - Only handles prerequisite checks
- `EnvService` - Only handles .env file operations
- `DatabaseWizard` - Only handles database configuration UI
- `ExecutionService` - Only handles command execution
- `TaskFactory` - Only creates VS Code tasks
- `Logger` - Only handles logging

#### Open/Closed Principle (OCP)
Classes are open for extension but closed for modification:
- `ExecutionService` uses strategy pattern for local vs Sail execution
- `TaskFactory` can create new task types without modifying existing code

#### Liskov Substitution Principle (LSP)
Derived classes can substitute their base classes without breaking functionality.

#### Interface Segregation Principle (ISP)
Clients are not forced to depend on interfaces they don't use:
- Small, focused interfaces in `interfaces/index.ts`

#### Dependency Inversion Principle (DIP)
High-level modules don't depend on low-level modules:
- `SetupController` depends on service abstractions
- Services are injected via constructor

### Service-Oriented Architecture
The extension is organized into specialized services:
- **Controllers**: Orchestrate workflows
- **Services**: Handle specific business logic
- **Factories**: Create complex objects
- **Utils**: Provide utility functions

## 📁 Project Structure

```
src/
├── extension.ts                    # Extension entry point
│   ├── Registers commands
│   ├── Creates status bar item
│   ├── Sets up file watchers
│   └── Initializes DI container
│
├── controllers/
│   └── SetupController.ts          # Main orchestrator
│       ├── Coordinates all services
│       ├── Manages setup workflow
│       └── Handles user interactions
│
├── services/
│   ├── PrerequisiteService.ts      # Checks software prerequisites
│   │   ├── checkPHP()
│   │   ├── checkComposer()
│   │   ├── checkNode()
│   │   └── checkDocker()
│   │
│   ├── EnvService.ts               # Environment file operations
│   │   ├── copyEnvExample()
│   │   ├── parseEnvFile()
│   │   ├── updateDatabaseConfig()
│   │   └── updateEnvKey()
│   │
│   ├── DatabaseWizard.ts           # Database configuration UI
│   │   ├── selectConnection()
│   │   ├── getHost()
│   │   ├── getPort()
│   │   ├── getDatabaseName()
│   │   ├── getUsername()
│   │   └── getPassword()
│   │
│   └── ExecutionService.ts         # Command execution abstraction
│       ├── execute()
│       ├── executeWithProgress()
│       ├── composerInstall()
│       ├── npmInstall()
│       ├── generateKey()
│       ├── runMigrations()
│       └── optimizeApplication()
│
├── factories/
│   └── TaskFactory.ts              # VS Code task creation
│       ├── createServeTask()
│       ├── createSailUpTask()
│       ├── createArtisanTask()
│       ├── createComposerInstallTask()
│       ├── createNpmInstallTask()
│       └── createNpmDevTask()
│
├── utils/
│   └── Logger.ts                   # Unified logging
│       ├── info()
│       ├── error()
│       ├── warn()
│       ├── success()
│       └── show()
│
└── interfaces/
    └── index.ts                    # TypeScript interfaces
        ├── IDatabaseConfig
        ├── IEnvConfig
        ├── IPrerequisiteResult
        ├── ISetupContext
        ├── ExecutionMode
        └── ITaskConfig
```

## 🔧 Core Components

### 1. SetupController (The Brain)

**Purpose**: Orchestrates the entire setup workflow.

**Key Methods**:
```typescript
runSetup(): Promise<void>
- Main entry point
- Coordinates all setup steps
- Handles errors and user feedback

validateWorkspace(): Promise<ISetupContext | undefined>
- Validates Laravel project
- Creates setup context

checkPrerequisites(context): Promise<boolean>
- Checks required software
- Validates minimum requirements

setupEnvironment(context): Promise<void>
- Handles .env file creation
- Manages existing .env files

configureSail(context): Promise<void>
- Prompts for Laravel Sail usage
- Sets execution mode

configureDatabaseIfNeeded(context): Promise<void>
- Runs database wizard
- Updates .env with database config

installDependencies(context): Promise<void>
- Installs Composer dependencies
- Optionally installs NPM dependencies

generateAppKey(context): Promise<void>
- Generates Laravel application key

runMigrationsIfDesired(context): Promise<void>
- Optionally runs database migrations

registerTasks(context): Promise<void>
- Registers VS Code tasks

showCompletionMessage(context): Promise<void>
- Shows success message
- Optionally starts development server
```

### 2. PrerequisiteService

**Purpose**: Checks for required software installations.

**Design Pattern**: Singleton-like for logger, Template Method for checks.

**Key Features**:
- Detects PHP version
- Checks Composer installation
- Validates Node.js presence
- Checks Docker availability
- Cross-platform command execution

### 3. EnvService

**Purpose**: Safe manipulation of Laravel .env files.

**Key Features**:
- Copies .env.example to .env
- Parses .env files to key-value objects
- Updates database configuration
- Updates individual keys
- Handles quoted values

### 4. DatabaseWizard

**Purpose**: Interactive UI for database configuration.

**Design Pattern**: Wizard Pattern (step-by-step).

**Supported Databases**:
- MySQL (default port: 3306)
- PostgreSQL (default port: 5432)
- SQLite (no host/port needed)
- SQL Server (default port: 1433)

**Features**:
- Progressive disclosure (6 steps)
- Smart defaults based on database type
- Input validation
- Password masking

### 5. ExecutionService

**Purpose**: Abstract command execution across environments.

**Design Pattern**: Strategy Pattern (Local vs Sail execution).

**Key Features**:
- Execution mode switching (LOCAL/SAIL)
- Progress indicators
- Error handling
- Output logging
- Common Laravel commands wrapped

### 6. TaskFactory

**Purpose**: Create VS Code tasks for Laravel workflows.

**Design Pattern**: Factory Pattern.

**Tasks Created**:
- Development server (serve/sail up)
- Dependency installation
- Artisan commands
- NPM scripts

### 7. Logger

**Purpose**: Unified logging to VS Code Output Channel.

**Design Pattern**: Singleton.

**Log Levels**:
- INFO: General information
- SUCCESS: Successful operations
- WARN: Warnings
- ERROR: Errors with stack traces

## 🚀 Development Setup

### Prerequisites
```bash
# Required
node >= 18.0.0
npm >= 9.0.0
```

### Clone and Install
```bash
git clone <repository-url>
cd Laravel-Fastboot
npm install
```

### Development Workflow

#### 1. Watch Mode
```bash
npm run watch
```
This starts TypeScript compilation and esbuild in watch mode.

#### 2. Run Extension
Press `F5` in VS Code to launch the Extension Development Host.

#### 3. Test Changes
In the Extension Development Host:
- Open a Laravel project
- Run "Laravel: Run First Setup" from Command Palette
- Test all wizard steps

#### 4. View Logs
- Open Output panel (`Cmd+Shift+U`)
- Select "Laravel Fast Boot" channel

### Debugging

**Breakpoints**: Set breakpoints in TypeScript files.

**Debug Console**: Access via `Cmd+Shift+Y`.

**Reload Extension**: `Cmd+R` in Extension Development Host.

## 🧪 Testing

### Manual Testing Checklist

#### Entry Points
- [ ] Command Palette: "Laravel: Run First Setup"
- [ ] Status Bar: Click "🚀 Setup Laravel"
- [ ] Context Menu: Right-click composer.json

#### Setup Flow
- [ ] Workspace validation (Laravel project check)
- [ ] Prerequisite checking
- [ ] .env file creation/preservation
- [ ] Sail configuration
- [ ] Database wizard (all 4 database types)
- [ ] Composer install
- [ ] NPM install
- [ ] Key generation
- [ ] Migrations
- [ ] Task registration
- [ ] Success message

#### Edge Cases
- [ ] Non-Laravel project
- [ ] Missing composer.json
- [ ] Existing .env file
- [ ] Missing prerequisites
- [ ] Failed installations
- [ ] Cancelled wizard

#### Cross-Platform
- [ ] macOS
- [ ] Windows
- [ ] Linux

### Unit Testing (Future)
```typescript
// Example test structure
describe('PrerequisiteService', () => {
    it('should detect PHP installation', async () => {
        const service = new PrerequisiteService();
        const result = await service.checkPHP();
        expect(result.installed).toBe(true);
    });
});
```

## 📦 Building and Publishing

### Build for Production
```bash
npm run package
```
This creates optimized bundle in `dist/`.

### Create VSIX Package
```bash
npm install -g @vscode/vsce
vsce package
```

### Publish to Marketplace
```bash
# First time setup
vsce login <publisher>

# Publish
vsce publish
```

### Version Management
```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

## 📋 Code Standards

### TypeScript
- **Strict Mode**: Enabled
- **No implicit any**: Required
- **Null checks**: Strict
- **Unused variables**: Error

### Naming Conventions
```typescript
// Classes: PascalCase
class PrerequisiteService {}

// Interfaces: IPascalCase
interface IDatabaseConfig {}

// Methods: camelCase
async runSetup() {}

// Constants: UPPER_SNAKE_CASE
const DEFAULT_PORT = 3306;

// Private members: _camelCase (optional)
private _logger: Logger;
```

### Documentation
```typescript
/**
 * Brief description
 * 
 * Detailed explanation if needed
 * 
 * @param paramName - Parameter description
 * @returns Return value description
 * @throws Error description
 */
public async methodName(paramName: string): Promise<void> {
    // Implementation
}
```

### Error Handling
```typescript
try {
    // Operation
} catch (error) {
    this.logger.error('Operation failed', error as Error);
    vscode.window.showErrorMessage('User-friendly message');
    throw error; // Re-throw if needed
}
```

### Async/Await
Always use async/await for I/O operations:
```typescript
// ✅ Good
const result = await service.execute(command);

// ❌ Bad
service.execute(command).then(result => {});
```

### Imports
```typescript
// Node modules first
import * as vscode from 'vscode';
import * as fs from 'fs';

// Local imports second
import { Logger } from '../utils/Logger';
import { IDatabaseConfig } from '../interfaces';
```

## 🔒 Security Considerations

1. **No Hardcoded Credentials**: Never store credentials in code
2. **Input Validation**: Validate all user inputs
3. **Path Traversal**: Use path.join() and validate paths
4. **Command Injection**: Use child_process.execFile() where possible
5. **Sensitive Data**: Mark password inputs with password: true

## 🎯 Best Practices

1. **Single Responsibility**: One class, one purpose
2. **Dependency Injection**: Inject dependencies via constructor
3. **Error Handling**: Always catch and log errors
4. **User Feedback**: Use progress indicators for long operations
5. **Logging**: Log all important operations
6. **Documentation**: Document public APIs
7. **Type Safety**: Use TypeScript types everywhere
8. **Immutability**: Prefer const over let

## 📈 Performance Considerations

1. **Lazy Loading**: Load services only when needed
2. **Caching**: Cache prerequisite check results
3. **Parallel Operations**: Use Promise.all() for independent operations
4. **File Watchers**: Dispose watchers properly
5. **Output Channel**: Don't log excessive data

## 🔄 Maintenance

### Adding New Features

1. Create new service in `src/services/`
2. Add interface in `src/interfaces/index.ts`
3. Integrate in `SetupController`
4. Update README.md
5. Update CHANGELOG.md
6. Add tests

### Updating Dependencies
```bash
npm outdated
npm update
npm audit fix
```

### Code Quality
```bash
# Lint
npm run lint

# Type check
npm run check-types

# Build
npm run compile
```

---

**For questions or contributions, please open an issue on GitHub.**
