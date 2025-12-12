/**
 * Environment Service
 * Handles .env file operations: copying, parsing, and editing
 * Following Single Responsibility Principle (SRP)
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { IEnvConfig, IDatabaseConfig } from '../interfaces';
import { Logger } from '../utils/Logger';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const copyFileAsync = promisify(fs.copyFile);
const existsAsync = promisify(fs.exists);

export class EnvService {
    private logger: Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    /**
     * Copy .env.example to .env
     */
    public async copyEnvExample(workspaceRoot: string): Promise<boolean> {
        const envExamplePath = path.join(workspaceRoot, '.env.example');
        const envPath = path.join(workspaceRoot, '.env');

        try {
            // Check if .env already exists
            if (await existsAsync(envPath)) {
                this.logger.warn('.env file already exists. Skipping copy.');
                return true;
            }

            // Check if .env.example exists
            if (!(await existsAsync(envExamplePath))) {
                this.logger.error('.env.example not found');
                return false;
            }

            // Copy file
            await copyFileAsync(envExamplePath, envPath);
            this.logger.success('.env file created from .env.example');
            return true;
        } catch (error) {
            this.logger.error('Failed to copy .env.example', error as Error);
            return false;
        }
    }

    /**
     * Parse .env file to key-value object
     */
    public async parseEnvFile(workspaceRoot: string): Promise<IEnvConfig> {
        const envPath = path.join(workspaceRoot, '.env');

        try {
            const content = await readFileAsync(envPath, 'utf-8');
            const config: IEnvConfig = {};

            // Parse line by line
            content.split('\n').forEach(line => {
                // Skip comments and empty lines
                line = line.trim();
                if (!line || line.startsWith('#')) {
                    return;
                }

                // Parse key=value
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    let value = match[2].trim();

                    // Remove quotes if present
                    if ((value.startsWith('"') && value.endsWith('"')) ||
                        (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }

                    config[key] = value;
                }
            });

            this.logger.info('.env file parsed successfully');
            return config;
        } catch (error) {
            this.logger.error('Failed to parse .env file', error as Error);
            return {};
        }
    }

    /**
     * Update .env file with database configuration
     */
    public async updateDatabaseConfig(
        workspaceRoot: string,
        dbConfig: IDatabaseConfig
    ): Promise<boolean> {
        const envPath = path.join(workspaceRoot, '.env');

        try {
            let content = await readFileAsync(envPath, 'utf-8');

            // Update database configuration
            const updates: { [key: string]: string } = {
                DB_CONNECTION: dbConfig.connection,
                DB_HOST: dbConfig.host,
                DB_PORT: dbConfig.port.toString(),
                DB_DATABASE: dbConfig.database,
                DB_USERNAME: dbConfig.username,
                DB_PASSWORD: dbConfig.password
            };

            // Replace each configuration
            Object.entries(updates).forEach(([key, value]) => {
                const regex = new RegExp(`^${key}=.*$`, 'm');
                const replacement = `${key}=${value}`;

                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                } else {
                    // Add if not exists
                    content += `\n${replacement}`;
                }
            });

            await writeFileAsync(envPath, content, 'utf-8');
            this.logger.success('Database configuration updated in .env');
            return true;
        } catch (error) {
            this.logger.error('Failed to update .env file', error as Error);
            return false;
        }
    }

    /**
     * Update specific key in .env file
     */
    public async updateEnvKey(
        workspaceRoot: string,
        key: string,
        value: string
    ): Promise<boolean> {
        const envPath = path.join(workspaceRoot, '.env');

        try {
            let content = await readFileAsync(envPath, 'utf-8');
            const regex = new RegExp(`^${key}=.*$`, 'm');
            const replacement = `${key}=${value}`;

            if (regex.test(content)) {
                content = content.replace(regex, replacement);
            } else {
                content += `\n${replacement}`;
            }

            await writeFileAsync(envPath, content, 'utf-8');
            this.logger.info(`Updated ${key} in .env`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to update ${key} in .env`, error as Error);
            return false;
        }
    }

    /**
     * Check if .env file exists
     */
    public async envExists(workspaceRoot: string): Promise<boolean> {
        const envPath = path.join(workspaceRoot, '.env');
        return await existsAsync(envPath);
    }

    /**
     * Check if .env.example file exists
     */
    public async envExampleExists(workspaceRoot: string): Promise<boolean> {
        const envExamplePath = path.join(workspaceRoot, '.env.example');
        return await existsAsync(envExamplePath);
    }

    /**
     * Create basic .env file with Laravel defaults
     */
    public async createBasicEnv(workspaceRoot: string): Promise<boolean> {
        const envPath = path.join(workspaceRoot, '.env');

        try {
            // Check if .env already exists
            if (await existsAsync(envPath)) {
                this.logger.info('.env file already exists');
                return true;
            }

            // Create basic Laravel .env content
            const basicEnvContent = `APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="\${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="\${APP_NAME}"
`;

            await writeFileAsync(envPath, basicEnvContent, 'utf-8');
            this.logger.success('Created basic .env file with Laravel defaults');
            return true;
        } catch (error) {
            this.logger.error('Failed to create basic .env file', error as Error);
            return false;
        }
    }
}
