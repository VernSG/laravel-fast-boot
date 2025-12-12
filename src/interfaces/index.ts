/**
 * Core interfaces for Laravel Fast Boot Extension
 * Following Interface Segregation Principle (ISP)
 */

/**
 * Database configuration interface
 */
export interface IDatabaseConfig {
    connection: string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

/**
 * Environment configuration interface
 */
export interface IEnvConfig {
    APP_NAME?: string;
    APP_ENV?: string;
    APP_KEY?: string;
    APP_DEBUG?: string;
    APP_URL?: string;
    DB_CONNECTION?: string;
    DB_HOST?: string;
    DB_PORT?: string;
    DB_DATABASE?: string;
    DB_USERNAME?: string;
    DB_PASSWORD?: string;
    [key: string]: string | undefined;
}

/**
 * Prerequisite check result
 */
export interface IPrerequisiteResult {
    name: string;
    installed: boolean;
    version?: string;
    error?: string;
}

/**
 * Setup context for orchestrating the setup flow
 */
export interface ISetupContext {
    workspaceRoot: string;
    composerExists: boolean;
    envExists: boolean;
    prerequisites: IPrerequisiteResult[];
    useSail: boolean;
    databaseConfig?: IDatabaseConfig;
}

/**
 * Execution mode for commands
 */
export enum ExecutionMode {
    LOCAL = 'local',
    SAIL = 'sail'
}

/**
 * Task configuration for VS Code tasks
 */
export interface ITaskConfig {
    label: string;
    type: string;
    command: string;
    group?: string;
    presentation?: {
        reveal: string;
        panel: string;
    };
}
