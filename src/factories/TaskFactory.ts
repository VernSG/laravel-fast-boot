/**
 * Task Factory
 * Generates VS Code Tasks for Laravel project
 * Following Factory Pattern and Open/Closed Principle (OCP)
 */

import * as vscode from 'vscode';
import { ITaskConfig } from '../interfaces';
import { Logger } from '../utils/Logger';

export class TaskFactory {
    private logger: Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    /**
     * Create Laravel development server task
     */
    public createServeTask(): vscode.Task {
        const definition: vscode.TaskDefinition = {
            type: 'shell',
            label: 'Laravel: Serve'
        };

        const execution = new vscode.ShellExecution('php artisan serve');

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            'Laravel: Serve',
            'Laravel Fast Boot',
            execution,
            []
        );

        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Dedicated
        };

        task.isBackground = true;
        task.group = vscode.TaskGroup.Build;

        this.logger.info('Created "Laravel: Serve" task');
        return task;
    }

    /**
     * Create Laravel Sail up task
     */
    public createSailUpTask(): vscode.Task {
        const definition: vscode.TaskDefinition = {
            type: 'shell',
            label: 'Laravel: Sail Up'
        };

        const execution = new vscode.ShellExecution('./vendor/bin/sail up');

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            'Laravel: Sail Up',
            'Laravel Fast Boot',
            execution,
            []
        );

        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Dedicated
        };

        task.isBackground = true;
        task.group = vscode.TaskGroup.Build;

        this.logger.info('Created "Laravel: Sail Up" task');
        return task;
    }

    /**
     * Create artisan command task
     */
    public createArtisanTask(command: string, useSail: boolean = false): vscode.Task {
        const label = `Laravel: Artisan ${command}`;
        const definition: vscode.TaskDefinition = {
            type: 'shell',
            label
        };

        const fullCommand = useSail 
            ? `./vendor/bin/sail artisan ${command}`
            : `php artisan ${command}`;

        const execution = new vscode.ShellExecution(fullCommand);

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            label,
            'Laravel Fast Boot',
            execution,
            []
        );

        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Shared
        };

        this.logger.info(`Created "${label}" task`);
        return task;
    }

    /**
     * Create composer install task
     */
    public createComposerInstallTask(): vscode.Task {
        const definition: vscode.TaskDefinition = {
            type: 'shell',
            label: 'Laravel: Composer Install'
        };

        const execution = new vscode.ShellExecution('composer install');

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            'Laravel: Composer Install',
            'Laravel Fast Boot',
            execution,
            []
        );

        task.group = vscode.TaskGroup.Build;

        this.logger.info('Created "Laravel: Composer Install" task');
        return task;
    }

    /**
     * Create npm install task
     */
    public createNpmInstallTask(): vscode.Task {
        const definition: vscode.TaskDefinition = {
            type: 'shell',
            label: 'Laravel: NPM Install'
        };

        const execution = new vscode.ShellExecution('npm install');

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            'Laravel: NPM Install',
            'Laravel Fast Boot',
            execution,
            []
        );

        task.group = vscode.TaskGroup.Build;

        this.logger.info('Created "Laravel: NPM Install" task');
        return task;
    }

    /**
     * Create npm dev task (Vite development server)
     */
    public createNpmDevTask(): vscode.Task {
        const definition: vscode.TaskDefinition = {
            type: 'shell',
            label: 'Laravel: NPM Dev'
        };

        const execution = new vscode.ShellExecution('npm run dev');

        const task = new vscode.Task(
            definition,
            vscode.TaskScope.Workspace,
            'Laravel: NPM Dev',
            'Laravel Fast Boot',
            execution,
            []
        );

        task.presentationOptions = {
            reveal: vscode.TaskRevealKind.Always,
            panel: vscode.TaskPanelKind.Dedicated
        };

        task.isBackground = true;
        task.group = vscode.TaskGroup.Build;

        this.logger.info('Created "Laravel: NPM Dev" task');
        return task;
    }

    /**
     * Register all common Laravel tasks
     */
    public async registerCommonTasks(useSail: boolean = false): Promise<void> {
        try {
            const tasks = [];

            if (useSail) {
                tasks.push(this.createSailUpTask());
            } else {
                tasks.push(this.createServeTask());
            }

            tasks.push(
                this.createComposerInstallTask(),
                this.createNpmInstallTask(),
                this.createNpmDevTask(),
                this.createArtisanTask('migrate', useSail),
                this.createArtisanTask('migrate:fresh', useSail),
                this.createArtisanTask('db:seed', useSail)
            );

            this.logger.success(`Registered ${tasks.length} Laravel tasks`);
        } catch (error) {
            this.logger.error('Failed to register tasks', error as Error);
        }
    }
}
