/**
 * Setup Controller
 * Orchestrates the Laravel setup flow (The "Brain")
 * Following Controller Pattern and Dependency Injection
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { PrerequisiteService } from '../services/PrerequisiteService';
import { EnvService } from '../services/EnvService';
import { DatabaseWizard } from '../services/DatabaseWizard';
import { ExecutionService } from '../services/ExecutionService';
import { TaskFactory } from '../factories/TaskFactory';
import { ISetupContext, ExecutionMode } from '../interfaces';
import { Logger } from '../utils/Logger';

const existsAsync = promisify(fs.exists);

export class SetupController {
    private logger: Logger;
    private prerequisiteService: PrerequisiteService;
    private envService: EnvService;
    private databaseWizard: DatabaseWizard;
    private executionService: ExecutionService;
    private taskFactory: TaskFactory;

    constructor() {
        this.logger = Logger.getInstance();
        this.prerequisiteService = new PrerequisiteService();
        this.envService = new EnvService();
        this.databaseWizard = new DatabaseWizard();
        this.executionService = new ExecutionService();
        this.taskFactory = new TaskFactory();
    }

    /**
     * Main setup orchestration method
     */
    public async runSetup(): Promise<void> {
        this.logger.clear();
        this.logger.info('=== Laravel Fast Boot Setup Started ===');
        this.logger.show();

        try {
            // Step 1: Validate workspace
            const context = await this.validateWorkspace();
            if (!context) {
                return;
            }

            // Step 2: Check prerequisites
            const prerequisitesOk = await this.checkPrerequisites(context);
            if (!prerequisitesOk) {
                return;
            }

            // Step 3: Confirm setup start
            const confirmed = await this.confirmSetup();
            if (!confirmed) {
                this.logger.info('Setup cancelled by user');
                return;
            }

            // Step 4: Copy .env file
            await this.setupEnvironment(context);

            // Step 5: Ask about Laravel Sail
            await this.configureSail(context);

            // Step 6: Database configuration
            await this.configureDatabaseIfNeeded(context);

            // Step 7: Install dependencies
            await this.installDependencies(context);

            // Step 8: Generate application key
            await this.generateAppKey(context);

            // Step 9: Run migrations (optional)
            await this.runMigrationsIfDesired(context);

            // Step 10: Register tasks
            await this.registerTasks(context);

            // Step 11: Optimize application
            await this.optimizeApp(context);

            // Success message
            await this.showCompletionMessage(context);

            this.logger.success('=== Laravel Fast Boot Setup Completed ===');
        } catch (error) {
            this.logger.error('Setup failed', error as Error);
            vscode.window.showErrorMessage('Laravel setup failed. Check the output for details.');
        }
    }

    /**
     * Validate workspace and create context
     */
    private async validateWorkspace(): Promise<ISetupContext | undefined> {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('No workspace folder open. Please open a Laravel project first.');
            return undefined;
        }

        const workspaceRoot = workspaceFolders[0].uri.fsPath;
        const composerJsonPath = path.join(workspaceRoot, 'composer.json');
        const composerExists = await existsAsync(composerJsonPath);

        if (!composerExists) {
            vscode.window.showErrorMessage('composer.json not found. This does not appear to be a Laravel project.');
            return undefined;
        }

        // Verify it's a Laravel project
        const isLaravel = await this.isLaravelProject(workspaceRoot);
        if (!isLaravel) {
            vscode.window.showErrorMessage('This does not appear to be a Laravel project.');
            return undefined;
        }

        const envExists = await this.envService.envExists(workspaceRoot);

        return {
            workspaceRoot,
            composerExists,
            envExists,
            prerequisites: [],
            useSail: false
        };
    }

    /**
     * Check if this is a Laravel project
     */
    private async isLaravelProject(workspaceRoot: string): Promise<boolean> {
        try {
            const composerJsonPath = path.join(workspaceRoot, 'composer.json');
            const content = await promisify(fs.readFile)(composerJsonPath, 'utf-8');
            const composerJson = JSON.parse(content);

            // Check for Laravel framework in dependencies
            const hasLaravel = composerJson.require && 
                              (composerJson.require['laravel/framework'] !== undefined);

            return hasLaravel;
        } catch {
            return false;
        }
    }

    /**
     * Check prerequisites
     */
    private async checkPrerequisites(context: ISetupContext): Promise<boolean> {
        context.prerequisites = await this.prerequisiteService.checkAll();

        const hasMinimum = this.prerequisiteService.hasMinimumRequirements(context.prerequisites);

        if (!hasMinimum) {
            const message = this.prerequisiteService.getMissingPrerequisitesMessage(context.prerequisites);
            vscode.window.showErrorMessage(message);
            return false;
        }

        return true;
    }

    /**
     * Confirm setup start
     */
    private async confirmSetup(): Promise<boolean> {
        const choice = await vscode.window.showInformationMessage(
            'Ready to setup your Laravel project. This will:\n• Copy .env.example to .env\n• Install dependencies\n• Generate application key\n• Configure database\n\nContinue?',
            'Yes',
            'No'
        );

        return choice === 'Yes';
    }

    /**
     * Setup environment file
     */
    private async setupEnvironment(context: ISetupContext): Promise<void> {
        if (context.envExists) {
            const overwrite = await vscode.window.showWarningMessage(
                '.env file already exists. Do you want to keep it?',
                'Keep Existing',
                'Create New'
            );

            if (overwrite === 'Create New') {
                const exampleExists = await this.envService.envExampleExists(context.workspaceRoot);
                if (exampleExists) {
                    await this.envService.copyEnvExample(context.workspaceRoot);
                } else {
                    this.logger.warn('.env.example not found, creating basic .env');
                    await this.envService.createBasicEnv(context.workspaceRoot);
                }
            } else {
                this.logger.info('Keeping existing .env file');
            }
        } else {
            // Check if .env.example exists
            const exampleExists = await this.envService.envExampleExists(context.workspaceRoot);
            
            if (exampleExists) {
                await this.envService.copyEnvExample(context.workspaceRoot);
            } else {
                this.logger.warn('.env.example not found, creating basic .env file');
                vscode.window.showWarningMessage(
                    '.env.example not found. Creating a basic .env file with Laravel defaults.',
                    'OK'
                );
                await this.envService.createBasicEnv(context.workspaceRoot);
            }
        }
    }

    /**
     * Configure Laravel Sail
     */
    private async configureSail(context: ISetupContext): Promise<void> {
        const dockerInstalled = context.prerequisites.find(p => p.name === 'Docker')?.installed;

        if (dockerInstalled) {
            const useSail = await vscode.window.showQuickPick(
                ['No, use local PHP', 'Yes, use Laravel Sail'],
                {
                    placeHolder: 'Do you want to use Laravel Sail (Docker)?',
                    title: 'Execution Environment'
                }
            );

            context.useSail = useSail === 'Yes, use Laravel Sail';
            
            if (context.useSail) {
                this.executionService.setMode(ExecutionMode.SAIL);
                this.logger.info('Using Laravel Sail for execution');
            } else {
                this.executionService.setMode(ExecutionMode.LOCAL);
                this.logger.info('Using local PHP for execution');
            }
        } else {
            this.executionService.setMode(ExecutionMode.LOCAL);
            this.logger.info('Docker not available, using local PHP');
        }
    }

    /**
     * Configure database if needed
     */
    private async configureDatabaseIfNeeded(context: ISetupContext): Promise<void> {
        const configureDb = await vscode.window.showQuickPick(
            ['Yes, configure now', 'No, skip for now'],
            {
                placeHolder: 'Do you want to configure database settings?',
                title: 'Database Configuration'
            }
        );

        if (configureDb === 'Yes, configure now') {
            const dbConfig = await this.databaseWizard.run();
            
            if (dbConfig) {
                context.databaseConfig = dbConfig;
                await this.envService.updateDatabaseConfig(context.workspaceRoot, dbConfig);
            }
        } else {
            this.logger.info('Skipped database configuration');
        }
    }

    /**
     * Install dependencies
     */
    private async installDependencies(context: ISetupContext): Promise<void> {
        // Composer install
        const composerSuccess = await this.executionService.composerInstall(context.workspaceRoot);
        
        if (!composerSuccess) {
            throw new Error('Composer install failed');
        }

        // NPM install (optional)
        const installNpm = await vscode.window.showQuickPick(
            ['Yes', 'No'],
            {
                placeHolder: 'Install NPM dependencies?',
                title: 'NPM Dependencies'
            }
        );

        if (installNpm === 'Yes') {
            await this.executionService.npmInstall(context.workspaceRoot);
        }
    }

    /**
     * Generate application key
     */
    private async generateAppKey(context: ISetupContext): Promise<void> {
        // Verify .env exists before generating key
        const envExists = await this.envService.envExists(context.workspaceRoot);
        
        if (!envExists) {
            this.logger.error('Cannot generate key: .env file does not exist');
            vscode.window.showErrorMessage(
                '.env file not found. Please create it manually and run: php artisan key:generate'
            );
            return;
        }

        const success = await this.executionService.generateKey(context.workspaceRoot);
        
        if (!success) {
            vscode.window.showWarningMessage(
                'Application key generation failed. You can generate it manually later by running: php artisan key:generate',
                'OK'
            );
        }
    }

    /**
     * Run migrations if desired
     */
    private async runMigrationsIfDesired(context: ISetupContext): Promise<void> {
        if (!context.databaseConfig) {
            return;
        }

        const runMigrations = await vscode.window.showQuickPick(
            ['Yes', 'No'],
            {
                placeHolder: 'Run database migrations now?',
                title: 'Database Migrations'
            }
        );

        if (runMigrations === 'Yes') {
            await this.executionService.runMigrations(context.workspaceRoot);
        }
    }

    /**
     * Register VS Code tasks
     */
    private async registerTasks(context: ISetupContext): Promise<void> {
        await this.taskFactory.registerCommonTasks(context.useSail);
    }

    /**
     * Optimize application
     */
    private async optimizeApp(context: ISetupContext): Promise<void> {
        await this.executionService.optimizeApplication(context.workspaceRoot);
    }

    /**
     * Show completion message with next steps
     */
    private async showCompletionMessage(context: ISetupContext): Promise<void> {
        const serveCommand = context.useSail ? 'sail up' : 'php artisan serve';
        
        const choice = await vscode.window.showInformationMessage(
            '✅ Laravel project setup completed successfully!\n\n' +
            `To start the development server, run: ${serveCommand}`,
            'Start Server',
            'Close'
        );

        if (choice === 'Start Server') {
            if (context.useSail) {
                await vscode.tasks.executeTask(this.taskFactory.createSailUpTask());
            } else {
                await vscode.tasks.executeTask(this.taskFactory.createServeTask());
            }
        }
    }
}
