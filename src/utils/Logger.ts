/**
 * Logger Utility
 * Provides unified logging to VS Code Output Channel
 * Following Single Responsibility Principle (SRP)
 */

import * as vscode from 'vscode';

export class Logger {
    private static instance: Logger;
    private outputChannel: vscode.OutputChannel;

    private constructor() {
        this.outputChannel = vscode.window.createOutputChannel('Laravel Fast Boot');
    }

    /**
     * Get singleton instance of Logger
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Log info message
     */
    public info(message: string): void {
        const timestamp = new Date().toISOString();
        this.outputChannel.appendLine(`[INFO ${timestamp}] ${message}`);
    }

    /**
     * Log error message
     */
    public error(message: string, error?: Error): void {
        const timestamp = new Date().toISOString();
        this.outputChannel.appendLine(`[ERROR ${timestamp}] ${message}`);
        if (error) {
            this.outputChannel.appendLine(`Stack: ${error.stack}`);
        }
    }

    /**
     * Log warning message
     */
    public warn(message: string): void {
        const timestamp = new Date().toISOString();
        this.outputChannel.appendLine(`[WARN ${timestamp}] ${message}`);
    }

    /**
     * Log success message
     */
    public success(message: string): void {
        const timestamp = new Date().toISOString();
        this.outputChannel.appendLine(`[SUCCESS ${timestamp}] ${message}`);
    }

    /**
     * Show output channel
     */
    public show(): void {
        this.outputChannel.show();
    }

    /**
     * Clear output channel
     */
    public clear(): void {
        this.outputChannel.clear();
    }

    /**
     * Dispose output channel
     */
    public dispose(): void {
        this.outputChannel.dispose();
    }
}
