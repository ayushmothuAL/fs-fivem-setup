import * as vscode from 'vscode';
import { ResourceGenerator } from './generators/ResourceGenerator';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('xdev-fivem-setup.createResource', async () => {
        const generator = new ResourceGenerator();
        await generator.generate();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}