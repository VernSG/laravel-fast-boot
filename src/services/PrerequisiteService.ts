/**
 * Prerequisite Service
 * Checks for required software: PHP, Composer, Node, Docker
 * Following Single Responsibility Principle (SRP)
 */

import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { IPrerequisiteResult } from '../interfaces';
import { Logger } from '../utils/Logger';

const execAsync = promisify(exec);

export class PrerequisiteService {
    private logger: Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    /**
     * Check all prerequisites
     */
    public async checkAll(): Promise<IPrerequisiteResult[]> {
        this.logger.info('Checking prerequisites...');

        const checks = [
            this.checkPHP(),
            this.checkComposer(),
            this.checkNode(),
            this.checkDocker()
        ];

        const results = await Promise.all(checks);
        
        // Log results
        results.forEach(result => {
            if (result.installed) {
                this.logger.success(`${result.name}: ${result.version}`);
            } else {
                this.logger.warn(`${result.name}: Not installed`);
            }
        });

        return results;
    }

    /**
     * Check if PHP is installed
     */
    private async checkPHP(): Promise<IPrerequisiteResult> {
        return this.checkCommand('php', 'PHP', 'php --version');
    }

    /**
     * Check if Composer is installed
     */
    private async checkComposer(): Promise<IPrerequisiteResult> {
        return this.checkCommand('composer', 'Composer', 'composer --version');
    }

    /**
     * Check if Node.js is installed
     */
    private async checkNode(): Promise<IPrerequisiteResult> {
        return this.checkCommand('node', 'Node.js', 'node --version');
    }

    /**
     * Check if Docker is installed
     */
    private async checkDocker(): Promise<IPrerequisiteResult> {
        return this.checkCommand('docker', 'Docker', 'docker --version');
    }

    /**
     * Generic command check helper
     */
    private async checkCommand(
        command: string,
        name: string,
        versionCommand: string
    ): Promise<IPrerequisiteResult> {
        try {
            const { stdout } = await execAsync(versionCommand);
            const version = this.parseVersion(stdout);

            return {
                name,
                installed: true,
                version
            };
        } catch (error) {
            return {
                name,
                installed: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Parse version from command output
     */
    private parseVersion(output: string): string {
        // Extract version numbers (e.g., "1.2.3")
        const versionMatch = output.match(/\d+\.\d+\.\d+/);
        return versionMatch ? versionMatch[0] : output.split('\n')[0].trim();
    }

    /**
     * Check if minimum requirements are met
     * @returns true if PHP and Composer are installed
     */
    public hasMinimumRequirements(results: IPrerequisiteResult[]): boolean {
        const php = results.find(r => r.name === 'PHP');
        const composer = results.find(r => r.name === 'Composer');

        return !!(php?.installed && composer?.installed);
    }

    /**
     * Get missing prerequisites message
     */
    public getMissingPrerequisitesMessage(results: IPrerequisiteResult[]): string {
        const missing = results.filter(r => !r.installed);
        
        if (missing.length === 0) {
            return '';
        }

        const names = missing.map(r => r.name).join(', ');
        return `Missing prerequisites: ${names}. Please install them and try again.`;
    }
}
