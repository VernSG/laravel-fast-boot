/**
 * Execution Service
 * Abstracts command execution (Local vs Laravel Sail)
 * Following Strategy Pattern and Open/Closed Principle (OCP)
 */

import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ExecutionMode } from '../interfaces';
import { Logger } from '../utils/Logger';

const execAsync = promisify(exec);

export class ExecutionService {
    private logger: Logger;
    private mode: ExecutionMode;

    constructor(mode: ExecutionMode = ExecutionMode.LOCAL) {
        this.logger = Logger.getInstance();
        this.mode = mode;
    }

    /**
     * Set execution mode
     */
    public setMode(mode: ExecutionMode): void {
        this.mode = mode;
        this.logger.info(`Execution mode set to: ${mode}`);
    }

    /**
     * Get current execution mode
     */
    public getMode(): ExecutionMode {
        return this.mode;
    }

    /**
     * Execute a command based on current mode
     */
    public async execute(
        command: string,
        cwd: string,
        showOutput: boolean = true
    ): Promise<{ success: boolean; output: string; error?: string }> {
        const fullCommand = this.buildCommand(command);
        
        this.logger.info(`Executing: ${fullCommand}`);
        
        if (showOutput) {
            this.logger.show();
        }

        try {
            const { stdout, stderr } = await execAsync(fullCommand, { cwd });
            
            if (stdout) {
                this.logger.info(`Output: ${stdout}`);
            }
            
            if (stderr) {
                this.logger.warn(`Warning: ${stderr}`);
            }

            return {
                success: true,
                output: stdout
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error(`Command failed: ${errorMessage}`, error as Error);
            
            return {
                success: false,
                output: '',
                error: errorMessage
            };
        }
    }

    /**
     * Execute command with progress indicator
     */
    public async executeWithProgress(
        command: string,
        cwd: string,
        progressTitle: string
    ): Promise<{ success: boolean; output: string; error?: string }> {
        return vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: progressTitle,
                cancellable: false
            },
            async () => {
                return await this.execute(command, cwd, true);
            }
        );
    }

    /**
     * Build command based on execution mode
     */
    private buildCommand(command: string): string {
        if (this.mode === ExecutionMode.SAIL) {
            // Wrap command in Laravel Sail
            return `./vendor/bin/sail ${command}`;
        }

        return command;
    }

    /**
     * Run composer install
     */
    public async composerInstall(cwd: string): Promise<boolean> {
        const result = await this.executeWithProgress(
            'composer install',
            cwd,
            'Installing Composer dependencies...'
        );

        if (result.success) {
            this.logger.success('Composer dependencies installed');
        } else {
            this.logger.error('Failed to install Composer dependencies');
            vscode.window.showErrorMessage('Composer install failed. Check the output for details.');
        }

        return result.success;
    }

    /**
     * Run npm install
     */
    public async npmInstall(cwd: string): Promise<boolean> {
        const result = await this.executeWithProgress(
            'npm install',
            cwd,
            'Installing NPM dependencies...'
        );

        if (result.success) {
            this.logger.success('NPM dependencies installed');
        } else {
            this.logger.warn('Failed to install NPM dependencies (optional)');
        }

        return result.success;
    }

    /**
     * Generate application key
     */
    public async generateKey(cwd: string): Promise<boolean> {
        const result = await this.executeWithProgress(
            'php artisan key:generate',
            cwd,
            'Generating application key...'
        );

        if (result.success) {
            this.logger.success('Application key generated');
        } else {
            this.logger.error('Failed to generate application key');
            if (result.error) {
                this.logger.error(`Error details: ${result.error}`);
            }
        }

        return result.success;
    }

    /**
     * Run database migrations
     */
    public async runMigrations(cwd: string): Promise<boolean> {
        const result = await this.executeWithProgress(
            'php artisan migrate',
            cwd,
            'Running database migrations...'
        );

        if (result.success) {
            this.logger.success('Database migrations completed');
        } else {
            this.logger.warn('Database migrations failed (you can run them manually later)');
        }

        return result.success;
    }

    /**
     * Clear and cache configuration
     */
    public async optimizeApplication(cwd: string): Promise<boolean> {
        const commands = [
            'php artisan config:clear',
            'php artisan cache:clear',
            'php artisan view:clear'
        ];

        for (const command of commands) {
            const result = await this.execute(command, cwd, false);
            if (!result.success) {
                this.logger.warn(`Failed to run: ${command}`);
            }
        }

        this.logger.success('Application optimized');
        return true;
    }
}
