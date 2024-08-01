import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.showWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'vs-md-wechat-new', // Identifies the type of the webview. Used internally
            'Markdown-公众号', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable JavaScript in the webview
            }
        );
        let htmlContent:string = getHtmlContentForWebview(context, panel.webview);
        console.log(htmlContent);
        panel.webview.html = htmlContent;

    });

    context.subscriptions.push(disposable);
}



export function deactivate() {}

function getHtmlContentForWebview(context: vscode.ExtensionContext, webview: vscode.Webview): string {
    const htmlPath: string = path.join(context.extensionPath,'resources' ,'md', 'index.html');
        const htmlContent: string = fs.readFileSync(htmlPath, 'utf8');
        // Update resource paths in the HTML content
        const updatedHtmlContent = updateHtmlContentForWebview(htmlContent, webview, context.extensionPath);
        return updatedHtmlContent;
}


function updateHtmlContentForWebview(htmlContent: string, webview: vscode.Webview, extensionPath: string): string {
    // Convert relative paths to webview URIs
    return htmlContent.replace(/(href|src)="([^"]*)"/g, (match, p1, p2) => {
        // Handle absolute URLs (http, https)
        if (p2.startsWith('http')) {
            return `${p1}="${p2}"`;
        }
        const resourcePath = vscode.Uri.file(path.join(extensionPath, 'resources', 'md', p2));
        const webviewUri = webview.asWebviewUri(resourcePath);
        return `${p1}="${webviewUri}"`;
    });
}
