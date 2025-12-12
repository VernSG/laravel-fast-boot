/**
 * Laravel Fast Boot Extension
 * Entry point for extension activation
 * Only handles registration & DI container setup
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { SetupController } from './controllers/SetupController';
import { Logger } from './utils/Logger';

let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Activate extension
 * This method is called when the extension is activated
 */
export function activate(context: vscode.ExtensionContext) {
	const logger = Logger.getInstance();
	logger.info('Laravel Fast Boot extension activated');

	// Initialize controller (Dependency Injection)
	const setupController = new SetupController();

	// Register command: Laravel: Run First Setup
	const setupCommand = vscode.commands.registerCommand(
		'laravelFastBoot.setup',
		async () => {
			await setupController.runSetup();
		}
	);

	// Register status bar item
	statusBarItem = createStatusBarItem();
	updateStatusBarVisibility();

	// Watch for file system changes to show/hide status bar
	const fileWatcher = vscode.workspace.onDidChangeWorkspaceFolders(() => {
		updateStatusBarVisibility();
	});

	const fileCreateWatcher = vscode.workspace.createFileSystemWatcher('**/composer.json');
	fileCreateWatcher.onDidCreate(() => updateStatusBarVisibility());
	fileCreateWatcher.onDidDelete(() => updateStatusBarVisibility());

	// Register context menu command
	const contextMenuCommand = vscode.commands.registerCommand(
		'laravelFastBoot.setupFromContext',
		async (uri: vscode.Uri) => {
			// Verify this is composer.json
			if (path.basename(uri.fsPath) === 'composer.json') {
				await setupController.runSetup();
			}
		}
	);

	// Add all disposables to subscriptions
	context.subscriptions.push(
		setupCommand,
		contextMenuCommand,
		statusBarItem,
		fileWatcher,
		fileCreateWatcher,
		logger
	);

	logger.info('Laravel Fast Boot extension ready');
}

/**
 * Create status bar item
 */
function createStatusBarItem(): vscode.StatusBarItem {
	const item = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
		100
	);

	item.text = '$(rocket) Setup Laravel';
	item.tooltip = 'Run Laravel Fast Boot Setup';
	item.command = 'laravelFastBoot.setup';

	return item;
}

/**
 * Update status bar visibility based on workspace
 */
function updateStatusBarVisibility(): void {
	if (!statusBarItem) {
		return;
	}

	const workspaceFolders = vscode.workspace.workspaceFolders;

	if (!workspaceFolders || workspaceFolders.length === 0) {
		statusBarItem.hide();
		return;
	}

	// Check if composer.json exists in workspace root
	const workspaceRoot = workspaceFolders[0].uri.fsPath;
	const composerJsonPath = path.join(workspaceRoot, 'composer.json');

	if (fs.existsSync(composerJsonPath)) {
		statusBarItem.show();
	} else {
		statusBarItem.hide();
	}
}

/**
 * Deactivate extension
 */
export function deactivate() {
	const logger = Logger.getInstance();
	logger.info('Laravel Fast Boot extension deactivated');
}
