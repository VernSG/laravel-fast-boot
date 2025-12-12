/**
 * Database Wizard Service
 * Handles UI prompts for database configuration
 * Following Single Responsibility Principle (SRP)
 */

import * as vscode from 'vscode';
import { IDatabaseConfig } from '../interfaces';
import { Logger } from '../utils/Logger';

export class DatabaseWizard {
    private logger: Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    /**
     * Run the database configuration wizard
     */
    public async run(): Promise<IDatabaseConfig | undefined> {
        this.logger.info('Starting database configuration wizard...');

        try {
            // Step 1: Select database connection type
            const connection = await this.selectConnection();
            if (!connection) {
                return undefined;
            }

            // Step 2: Get host
            const host = await this.getHost(connection);
            if (!host) {
                return undefined;
            }

            // Step 3: Get port
            const port = await this.getPort(connection);
            if (port === undefined) {
                return undefined;
            }

            // Step 4: Get database name
            const database = await this.getDatabaseName();
            if (!database) {
                return undefined;
            }

            // Step 5: Get username
            const username = await this.getUsername(connection);
            if (username === undefined) {
                return undefined;
            }

            // Step 6: Get password
            const password = await this.getPassword();
            if (password === undefined) {
                return undefined;
            }

            const config: IDatabaseConfig = {
                connection,
                host,
                port,
                database,
                username,
                password
            };

            this.logger.success('Database configuration completed');
            return config;
        } catch (error) {
            this.logger.error('Database wizard failed', error as Error);
            vscode.window.showErrorMessage('Database configuration failed. Please try again.');
            return undefined;
        }
    }

    /**
     * Select database connection type
     */
    private async selectConnection(): Promise<string | undefined> {
        const options = [
            { label: 'MySQL', value: 'mysql', description: 'MySQL database' },
            { label: 'PostgreSQL', value: 'pgsql', description: 'PostgreSQL database' },
            { label: 'SQLite', value: 'sqlite', description: 'SQLite database (file-based)' },
            { label: 'SQL Server', value: 'sqlsrv', description: 'Microsoft SQL Server' }
        ];

        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Select database connection type',
            title: 'Database Configuration (1/6)'
        });

        return selected?.value;
    }

    /**
     * Get database host
     */
    private async getHost(connection: string): Promise<string | undefined> {
        // SQLite doesn't need a host
        if (connection === 'sqlite') {
            return '';
        }

        const defaultHost = connection === 'pgsql' ? '127.0.0.1' : 'localhost';

        const host = await vscode.window.showInputBox({
            prompt: 'Enter database host',
            placeHolder: defaultHost,
            value: defaultHost,
            title: 'Database Configuration (2/6)',
            validateInput: (value) => {
                if (!value) {
                    return 'Host is required';
                }
                return null;
            }
        });

        return host;
    }

    /**
     * Get database port
     */
    private async getPort(connection: string): Promise<number | undefined> {
        // SQLite doesn't need a port
        if (connection === 'sqlite') {
            return 0;
        }

        const defaultPorts: { [key: string]: number } = {
            mysql: 3306,
            pgsql: 5432,
            sqlsrv: 1433
        };

        const defaultPort = defaultPorts[connection] || 3306;

        const portString = await vscode.window.showInputBox({
            prompt: 'Enter database port',
            placeHolder: defaultPort.toString(),
            value: defaultPort.toString(),
            title: 'Database Configuration (3/6)',
            validateInput: (value) => {
                const port = parseInt(value);
                if (isNaN(port) || port < 1 || port > 65535) {
                    return 'Please enter a valid port number (1-65535)';
                }
                return null;
            }
        });

        return portString ? parseInt(portString) : undefined;
    }

    /**
     * Get database name
     */
    private async getDatabaseName(): Promise<string | undefined> {
        const database = await vscode.window.showInputBox({
            prompt: 'Enter database name',
            placeHolder: 'laravel',
            value: 'laravel',
            title: 'Database Configuration (4/6)',
            validateInput: (value) => {
                if (!value) {
                    return 'Database name is required';
                }
                return null;
            }
        });

        return database;
    }

    /**
     * Get database username
     */
    private async getUsername(connection: string): Promise<string | undefined> {
        // SQLite doesn't need a username
        if (connection === 'sqlite') {
            return '';
        }

        const defaultUsername = connection === 'pgsql' ? 'postgres' : 'root';

        const username = await vscode.window.showInputBox({
            prompt: 'Enter database username',
            placeHolder: defaultUsername,
            value: defaultUsername,
            title: 'Database Configuration (5/6)',
            validateInput: (value) => {
                if (!value) {
                    return 'Username is required';
                }
                return null;
            }
        });

        return username;
    }

    /**
     * Get database password
     */
    private async getPassword(): Promise<string | undefined> {
        const password = await vscode.window.showInputBox({
            prompt: 'Enter database password (leave empty if no password)',
            placeHolder: 'password',
            password: true,
            title: 'Database Configuration (6/6)'
        });

        return password !== undefined ? password : undefined;
    }
}
