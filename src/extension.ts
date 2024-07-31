import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "webview-sample" is now active!');

    let disposable = vscode.commands.registerCommand('extension.showWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'webview', // Identifies the type of the webview. Used internally
            'Webview Example', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true // Enable JavaScript in the webview
            }
        );

        const htmlPath: string = path.join(context.extensionPath, 'src', 'md', 'index.html');
        const htmlContent: string = fs.readFileSync(htmlPath, 'utf8');
        console.log(htmlPath);
        console.log(htmlContent);

        // Update resource paths in the HTML content
        const updatedHtmlContent = updateHtmlContentForWebview(htmlContent, panel.webview, context.extensionPath);
        panel.webview.html = updatedHtmlContent;
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function updateHtmlContentForWebview(htmlContent: string, webview: vscode.Webview, extensionPath: string): string {
    // Convert relative paths to webview URIs
    return htmlContent.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
        // Handle absolute URLs (http, https)
        if (p2.startsWith('http')) {
            return `${p1}="${p2}"`;
        }
        const resourcePath = vscode.Uri.file(path.join(extensionPath, 'src', 'md', p2));
        const webviewUri = webview.asWebviewUri(resourcePath);
        return `${p1}="${webviewUri}"`;
    });
}
