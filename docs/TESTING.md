# Laravel Fast Boot - Testing Guide

This guide will help you test the Laravel Fast Boot extension thoroughly.

## 🧪 Test Setup

### Prerequisites
Before testing, ensure you have:
- [ ] VS Code installed
- [ ] PHP 8.1+ installed
- [ ] Composer installed
- [ ] Node.js 16+ installed (optional)
- [ ] Docker installed (optional, for Sail testing)
- [ ] A fresh Laravel project cloned (without .env)

### Creating a Test Laravel Project
```bash
# Option 1: Clone Laravel starter
git clone https://github.com/laravel/laravel test-laravel
cd test-laravel

# Option 2: Use Composer
composer create-project laravel/laravel test-laravel
cd test-laravel

# Remove .env for testing
rm .env
```

## 🚀 Running the Extension in Development Mode

1. Open the extension project in VS Code
2. Press `F5` to launch Extension Development Host
3. In the new window, open your test Laravel project
4. Extension is now active and ready for testing

## ✅ Test Cases

### 1. Entry Points Testing

#### Test 1.1: Command Palette
- [ ] Open Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
- [ ] Type "Laravel: Run First Setup"
- [ ] Command appears in the list
- [ ] Command is executable

**Expected**: Command launches the setup wizard

#### Test 1.2: Status Bar
- [ ] Open a Laravel project with composer.json in root
- [ ] Check bottom-left status bar
- [ ] Status bar shows "🚀 Setup Laravel" button
- [ ] Click the button

**Expected**: Status bar button is visible and launches wizard

#### Test 1.3: Status Bar Visibility
- [ ] Open a Laravel project (status bar should show)
- [ ] Close the workspace
- [ ] Open a non-Laravel folder

**Expected**: Status bar hides when no composer.json exists

#### Test 1.4: Context Menu
- [ ] Right-click on `composer.json` in Explorer
- [ ] Look for "Setup Laravel Project" in context menu
- [ ] Click the menu item

**Expected**: Context menu item appears and launches wizard

### 2. Workspace Validation Testing

#### Test 2.1: Valid Laravel Project
- [ ] Open a Laravel project with composer.json
- [ ] Run setup command
- [ ] Check for Laravel framework in composer.json

**Expected**: Setup proceeds without validation errors

#### Test 2.2: Invalid Project
- [ ] Open a non-Laravel project (e.g., React app)
- [ ] Run setup command

**Expected**: Error message: "This does not appear to be a Laravel project"

#### Test 2.3: No composer.json
- [ ] Open a folder without composer.json
- [ ] Run setup command

**Expected**: Error message: "composer.json not found"

#### Test 2.4: No Workspace Open
- [ ] Close all folders/workspaces
- [ ] Run setup command

**Expected**: Error message: "No workspace folder open"

### 3. Prerequisite Checking

#### Test 3.1: All Prerequisites Met
- [ ] Ensure PHP, Composer, Node, Docker installed
- [ ] Run setup
- [ ] Check Output panel for prerequisite results

**Expected**: All prerequisites show as installed with versions

#### Test 3.2: Missing PHP
- [ ] Temporarily rename PHP binary (or adjust PATH)
- [ ] Run setup

**Expected**: Error about missing PHP, setup stops

#### Test 3.3: Missing Composer
- [ ] Temporarily remove Composer from PATH
- [ ] Run setup

**Expected**: Error about missing Composer, setup stops

#### Test 3.4: Optional Dependencies
- [ ] Run with Node.js missing
- [ ] Run with Docker missing

**Expected**: Setup continues, logs warnings for optional dependencies

### 4. Environment Setup Testing

#### Test 4.1: New .env Creation
- [ ] Remove .env file
- [ ] Ensure .env.example exists
- [ ] Run setup

**Expected**: .env created from .env.example

#### Test 4.2: Existing .env Preservation
- [ ] Create a .env file with custom content
- [ ] Run setup
- [ ] Choose "Keep Existing"

**Expected**: Original .env preserved, setup continues

#### Test 4.3: Existing .env Overwrite
- [ ] Create a .env file
- [ ] Run setup
- [ ] Choose "Create New"

**Expected**: New .env created from .env.example

#### Test 4.4: Missing .env.example
- [ ] Remove both .env and .env.example
- [ ] Run setup

**Expected**: Error logged, but setup may continue

### 5. Laravel Sail Configuration

#### Test 5.1: Sail with Docker Available
- [ ] Ensure Docker is installed and running
- [ ] Run setup
- [ ] Choose "Yes, use Laravel Sail"

**Expected**: Execution mode set to SAIL, logged appropriately

#### Test 5.2: Sail without Docker
- [ ] Stop Docker or temporarily remove from PATH
- [ ] Run setup

**Expected**: Sail option not offered, defaults to local PHP

#### Test 5.3: Local PHP Choice
- [ ] Docker available
- [ ] Run setup
- [ ] Choose "No, use local PHP"

**Expected**: Execution mode set to LOCAL

### 6. Database Configuration Wizard

#### Test 6.1: MySQL Configuration
- [ ] Choose to configure database
- [ ] Select "MySQL"
- [ ] Enter host: localhost
- [ ] Enter port: 3306
- [ ] Enter database: laravel
- [ ] Enter username: root
- [ ] Enter password: (your password)
- [ ] Check .env file

**Expected**: All values correctly saved to .env

#### Test 6.2: PostgreSQL Configuration
- [ ] Select "PostgreSQL"
- [ ] Use default host (127.0.0.1) and port (5432)
- [ ] Complete wizard

**Expected**: Correct PostgreSQL values in .env

#### Test 6.3: SQLite Configuration
- [ ] Select "SQLite"

**Expected**: No host/port/username prompts, only database name

#### Test 6.4: SQL Server Configuration
- [ ] Select "SQL Server"
- [ ] Use default port 1433

**Expected**: Correct SQL Server values in .env

#### Test 6.5: Skip Database Configuration
- [ ] Choose "No, skip for now"

**Expected**: Database configuration skipped, setup continues

#### Test 6.6: Cancel During Wizard
- [ ] Start database wizard
- [ ] Press ESC during any step

**Expected**: Wizard cancelled, setup continues or stops gracefully

### 7. Dependency Installation

#### Test 7.1: Composer Install Success
- [ ] Remove vendor/ directory
- [ ] Run setup
- [ ] Watch progress notification

**Expected**: Composer install completes, vendor/ created

#### Test 7.2: Composer Install Failure
- [ ] Corrupt composer.json (invalid JSON)
- [ ] Run setup

**Expected**: Error shown, logged, setup stops

#### Test 7.3: NPM Install - Yes
- [ ] Remove node_modules/
- [ ] Run setup
- [ ] Choose "Yes" for NPM install

**Expected**: NPM install runs, node_modules/ created

#### Test 7.4: NPM Install - No
- [ ] Run setup
- [ ] Choose "No" for NPM install

**Expected**: NPM install skipped

### 8. Application Key Generation

#### Test 8.1: Key Generation
- [ ] Check .env - APP_KEY should be empty
- [ ] Run setup
- [ ] Check .env after setup

**Expected**: APP_KEY populated with base64:... value

#### Test 8.2: Key Generation Failure
- [ ] Make artisan file non-executable or remove it
- [ ] Run setup

**Expected**: Error logged and shown to user

### 9. Database Migrations

#### Test 9.1: Run Migrations - Yes
- [ ] Configure database with valid credentials
- [ ] Create database manually
- [ ] Choose "Yes" for migrations

**Expected**: Migrations run successfully

#### Test 9.2: Run Migrations - No
- [ ] Configure database
- [ ] Choose "No" for migrations

**Expected**: Migrations skipped

#### Test 9.3: Migrations Failure
- [ ] Configure database with invalid credentials
- [ ] Choose "Yes" for migrations

**Expected**: Error logged, warning shown, setup continues

#### Test 9.4: Skip Database Config
- [ ] Skip database configuration
- [ ] Migrations prompt should not appear

**Expected**: Migrations prompt skipped

### 10. Task Registration

#### Test 10.1: Local PHP Tasks
- [ ] Complete setup with local PHP
- [ ] Open Command Palette
- [ ] Type "Tasks: Run Task"
- [ ] Check for Laravel tasks

**Expected**: Tasks like "Laravel: Serve", "Laravel: Composer Install" appear

#### Test 10.2: Sail Tasks
- [ ] Complete setup with Laravel Sail
- [ ] Check available tasks

**Expected**: "Laravel: Sail Up" task available

#### Test 10.3: Run Serve Task
- [ ] After setup, choose "Start Server" in completion message
- [ ] OR manually run "Laravel: Serve" task

**Expected**: Development server starts on port 8000

### 11. Completion Flow

#### Test 11.1: Start Server - Yes
- [ ] Complete setup
- [ ] Click "Start Server" in completion message

**Expected**: Development server task starts

#### Test 11.2: Start Server - No
- [ ] Complete setup
- [ ] Click "Close" in completion message

**Expected**: Completion message closes, no server starts

### 12. Logging and Output

#### Test 12.1: Output Channel
- [ ] Run setup
- [ ] Open Output panel (`Cmd+Shift+U`)
- [ ] Select "Laravel Fast Boot"

**Expected**: Detailed logs of all operations visible

#### Test 12.2: Log Levels
- [ ] Check for [INFO] logs
- [ ] Check for [SUCCESS] logs
- [ ] Check for [WARN] logs (if applicable)
- [ ] Check for [ERROR] logs (if you trigger errors)

**Expected**: Appropriate log levels used

### 13. Error Handling

#### Test 13.1: Graceful Errors
- [ ] Cause various errors (missing files, invalid permissions)
- [ ] Check that extension doesn't crash

**Expected**: Errors logged, user-friendly messages shown

#### Test 13.2: User Cancellation
- [ ] Start setup
- [ ] Cancel at various steps

**Expected**: Setup stops gracefully, no errors

### 14. Cross-Platform Testing

#### Test 14.1: macOS
- [ ] Test all features on macOS

#### Test 14.2: Windows
- [ ] Test all features on Windows
- [ ] Check path handling (backslashes)

#### Test 14.3: Linux
- [ ] Test all features on Linux

### 15. Edge Cases

#### Test 15.1: Large Project
- [ ] Test with a Laravel project with many dependencies

**Expected**: Handles large composer.json and installations

#### Test 15.2: Slow Network
- [ ] Test with slow internet connection

**Expected**: Progress indicators work, no timeouts

#### Test 15.3: No Internet
- [ ] Test with no internet connection

**Expected**: Composer/NPM fail gracefully with clear messages

#### Test 15.4: Nested Workspace
- [ ] Open a workspace with multiple folders
- [ ] Laravel project is in a subfolder

**Expected**: Extension detects and handles correctly

## 📊 Test Results Template

```markdown
## Test Run: [Date]

### Environment
- OS: [macOS/Windows/Linux]
- VS Code Version: [version]
- PHP Version: [version]
- Composer Version: [version]
- Node Version: [version]
- Docker Version: [version]

### Test Results
| Test Case | Status | Notes |
|-----------|--------|-------|
| 1.1 Command Palette | ✅ | |
| 1.2 Status Bar | ✅ | |
| 1.3 Status Bar Visibility | ✅ | |
| ... | | |

### Issues Found
1. [Issue description]
2. [Issue description]

### Overall Status
[ ] All tests passed
[ ] Some tests failed
[ ] Critical issues found
```

## 🐛 Debugging Tips

### View Extension Logs
1. Help > Toggle Developer Tools
2. Console tab shows extension console logs

### Reload Extension
- Press `Cmd+R` (macOS) or `Ctrl+R` (Windows/Linux) in Extension Development Host

### Break on Errors
- In VS Code settings, enable "Debug: Break On Exception"

### Set Breakpoints
- Set breakpoints in TypeScript files
- They work in Extension Development Host

## 📝 Reporting Issues

When reporting issues, include:
1. Test case that failed
2. Expected behavior
3. Actual behavior
4. Screenshots (if applicable)
5. Output channel logs
6. Environment details

## ✨ Success Criteria

The extension is ready for release when:
- [ ] All test cases pass on all platforms
- [ ] No critical bugs
- [ ] Error handling is robust
- [ ] User experience is smooth
- [ ] Logging is comprehensive
- [ ] Documentation is complete

---

**Happy Testing!** 🧪
