# 🚀 Laravel Fast Boot - Installation & Usage

## 🎯 For End Users

### Installation (Once Published to VS Code Marketplace)

1. **From VS Code**
   - Open VS Code
   - Press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux)
   - Search for "Laravel Fast Boot"
   - Click "Install"

2. **From Command Line**
   ```bash
   code --install-extension YourPublisher.laravel-fast-boot
   ```

### Quick Usage

1. **Open Laravel Project**
   ```bash
   cd your-laravel-project
   code .
   ```

2. **Run Setup (Choose One)**
   - **Option A**: Click "🚀 Setup Laravel" in status bar
   - **Option B**: `Cmd+Shift+P` → "Laravel: Run First Setup"
   - **Option C**: Right-click `composer.json` → "Setup Laravel Project"

3. **Follow Wizard** - Answer prompts and let it set up everything!

---

## 🛠️ For Developers

### Installation from Source

```bash
# Clone repository
git clone <repository-url>
cd Laravel-Fastboot

# Install dependencies
npm install

# Compile
npm run compile
```

### Development

```bash
# Watch mode (auto-compile on changes)
npm run watch

# In VS Code, press F5 to launch Extension Development Host
```

### Testing Your Changes

1. Press `F5` in VS Code
2. A new "Extension Development Host" window opens
3. Open a Laravel project in the new window
4. Test the extension features
5. Check "Laravel Fast Boot" output channel for logs

### Building for Production

```bash
# Build optimized bundle
npm run package

# Verify compilation
npm run check-types
npm run lint
```

### Creating VSIX Package

```bash
# Install vsce globally (first time only)
npm install -g @vscode/vsce

# Create .vsix package
vsce package

# This creates: laravel-fast-boot-1.0.0.vsix
```

### Installing VSIX Locally

```bash
code --install-extension laravel-fast-boot-1.0.0.vsix
```

### Publishing to Marketplace

```bash
# First time setup
vsce login <publisher-name>

# Publish
vsce publish

# Or specific version
vsce publish major  # 1.0.0 → 2.0.0
vsce publish minor  # 1.0.0 → 1.1.0
vsce publish patch  # 1.0.0 → 1.0.1
```

---

## 📝 Before Publishing Checklist

### Required
- [ ] Update `publisher` in package.json
- [ ] Update repository URL in package.json
- [ ] Create 128x128 icon.png in images/
- [ ] Update icon path in package.json
- [ ] Test on macOS
- [ ] Test on Windows
- [ ] Test on Linux
- [ ] Update README with actual screenshots
- [ ] Update marketplace badges in README

### Optional
- [ ] Create demo video
- [ ] Add marketplace banner
- [ ] Set up GitHub releases
- [ ] Create documentation website
- [ ] Set up CI/CD

---

## 🔧 Configuration Files

### package.json Changes Needed

Before publishing, update these fields:

```json
{
  "publisher": "YourActualPublisher",
  "author": "Your Actual Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/laravel-fast-boot"
  }
}
```

### Create Publisher Account

1. Visit https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft/GitHub account
3. Create new publisher
4. Generate Personal Access Token
5. Save token securely

---

## 🧪 Testing Checklist

Before releasing, ensure:

- [ ] All entry points work (Command Palette, Status Bar, Context Menu)
- [ ] Prerequisite checking works
- [ ] .env creation/preservation works
- [ ] Database wizard works for all DB types
- [ ] Composer install works
- [ ] NPM install works
- [ ] Key generation works
- [ ] Migrations work
- [ ] Tasks are registered
- [ ] Server starts successfully
- [ ] Logging works
- [ ] Error handling works
- [ ] Cross-platform compatibility

---

## 📚 Documentation Structure

All documentation is in markdown files:

| File | Purpose | Audience |
|------|---------|----------|
| README.md | Main docs, features | Users |
| QUICKSTART.md | Quick start guide | Users |
| DEVELOPMENT.md | Developer guide | Developers |
| TESTING.md | Testing procedures | Testers |
| CHANGELOG.md | Version history | All |
| PROJECT_SUMMARY.md | Project overview | All |
| COMPLETION_REPORT.md | Final status | Developers |

---

## 🚀 Commands Reference

### Development
```bash
npm install           # Install dependencies
npm run compile       # Compile TypeScript
npm run watch         # Watch mode
npm run check-types   # Type checking
npm run lint          # Linting
npm run package       # Production build
```

### Testing
```bash
npm test              # Run tests
npm run pretest       # Prepare tests
```

### Publishing
```bash
vsce package          # Create .vsix
vsce publish          # Publish to marketplace
vsce ls               # List files in package
```

---

## 🎯 Project Structure

```
Laravel-Fastboot/
├── src/                    # Source code
│   ├── controllers/        # Orchestration
│   ├── services/           # Business logic
│   ├── factories/          # Object creation
│   ├── interfaces/         # Type definitions
│   └── utils/              # Utilities
├── dist/                   # Compiled output
├── node_modules/           # Dependencies
├── .vscode/                # VS Code config
├── images/                 # Assets
└── [docs].md               # Documentation
```

---

## 💡 Tips

### For Development
1. Use `npm run watch` during development
2. Press `Cmd+R` to reload Extension Development Host
3. Check Output channel for logs
4. Use breakpoints for debugging

### For Publishing
1. Test thoroughly before publishing
2. Use semantic versioning
3. Update CHANGELOG.md for each release
4. Tag releases in Git
5. Create GitHub releases with notes

### For Maintenance
1. Monitor GitHub issues
2. Respond to user feedback
3. Keep dependencies updated
4. Follow VS Code API changes
5. Test on new VS Code versions

---

## 🆘 Troubleshooting

### Extension won't activate
- Check VS Code version compatibility
- Look for activation errors in Developer Tools (Help → Toggle Developer Tools)
- Verify `activationEvents` in package.json

### Compilation errors
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run compile
```

### VSIX creation fails
- Check .vscodeignore includes all necessary files
- Verify package.json is valid JSON
- Ensure README.md exists

### Publishing fails
- Verify publisher account is set up
- Check Personal Access Token is valid
- Ensure unique extension name
- Verify version number is incremented

---

## 📞 Support

### For Users
- Check QUICKSTART.md for usage help
- Check TESTING.md for troubleshooting
- Open GitHub issue for bugs

### For Developers
- Check DEVELOPMENT.md for architecture details
- Check source code comments
- Open GitHub issue for questions

---

## 🏁 Quick Start Summary

**For Users:**
1. Install extension → Open Laravel project → Run setup → Done!

**For Developers:**
1. Clone → `npm install` → `npm run watch` → Press F5 → Test

**For Publishing:**
1. Test → Update package.json → `vsce package` → `vsce publish` → Done!

---

**Ready to bootstrap Laravel projects in seconds!** 🚀
