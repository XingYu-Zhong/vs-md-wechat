import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "webview-sample" is now active!');

    let disposable = vscode.commands.registerCommand('extension.showWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'vs-md-wechat-new', // Identifies the type of the webview. Used internally
            'Markdown-公众号', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable JavaScript in the webview
                retainContextWhenHidden: true, //
            }
        );
        panel.webview.html = getHtmlContentForWebview(context, panel.webview);
    });

    context.subscriptions.push(disposable);

    const provider = new SidebarProvider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('vsMdView', provider)
    );
}



export function deactivate() {}

function getHtmlContentForWebview(context: vscode.ExtensionContext, webview: vscode.Webview): string {
    const htmlPath: string = path.join(context.extensionPath, 'src', 'md', 'index.html');
        const htmlContent: string = fs.readFileSync(htmlPath, 'utf8');
        console.log(htmlPath);
        console.log(htmlContent);
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
        const resourcePath = vscode.Uri.file(path.join(extensionPath, 'src', 'md', p2));
        const webviewUri = webview.asWebviewUri(resourcePath);
        return `${p1}="${webviewUri}"`;
    });
}


class SidebarProvider implements vscode.WebviewViewProvider {
    context: vscode.ExtensionContext;
    constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }
    // 实现 resolveWebviewView 方法，用于处理 WebviewView 的创建和设置
  resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext<unknown>, token: vscode.CancellationToken): void | Thenable<void> {
    // 配置 WebviewView 的选项
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri]
    };
    // 设置 WebviewView 的 HTML 内容，可以在这里指定要加载的网页内容
    webviewView.webview.html = getHtmlContentForWebview(this.context, webviewView.webview);
}
}