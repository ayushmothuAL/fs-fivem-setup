import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FileTemplates } from '../templates/FileTemplates';
import { FolderStructure } from '../config/FolderStructure';
import { FileStructure } from '../config/FileStructure';

export class ResourceGenerator {
    private workspaceFolder: string;

    constructor() {
        const workspace = vscode.workspace.workspaceFolders?.[0];
        if (!workspace) {
            throw new Error('No workspace folder found');
        }
        this.workspaceFolder = workspace.uri.fsPath;
    }

    public async generate(): Promise<void> {
        try {
            await this.createFolderStructure();
            await this.createFiles();
            vscode.window.showInformationMessage('FiveM resource structure created successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Error creating resource: ${error}`);
        }
    }

    private async createFolderStructure(): Promise<void> {
        for (const folder of FolderStructure) {
            const folderPath = path.join(this.workspaceFolder, folder);
            if (!fs.existsSync(folderPath)) {
                await fs.promises.mkdir(folderPath, { recursive: true });
            }
        }
    }

    private async createFiles(): Promise<void> {
        for (const [filePath, templateKey] of Object.entries(FileStructure)) {
            const fullPath = path.join(this.workspaceFolder, filePath);
            if (!fs.existsSync(fullPath)) {
                await fs.promises.writeFile(fullPath, FileTemplates[templateKey]);
            }
        }
    }
}