import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.showWebview', () => {
        // 获取当前活动的编辑器
        const activeEditor = vscode.window.activeTextEditor;
        
        // 检查是否有打开的文档且是markdown文件
        if (!activeEditor || activeEditor.document.languageId !== 'markdown') {
            vscode.window.showWarningMessage('请先打开一个Markdown文档');
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'vs-md-wechat-new', // Identifies the type of the webview. Used internally
            'Markdown-公众号', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true, // Enable JavaScript in the webview
                retainContextWhenHidden: true, // 保持webview状态
            }
        );

        // 获取当前文档的内容
        const documentContent = activeEditor.document.getText();
        
        let htmlContent: string = getHtmlContentForWebview(context, panel.webview);
        console.log(htmlContent);
        panel.webview.html = htmlContent;

        // 等待webview加载完成后发送初始内容
        setTimeout(() => {
            panel.webview.postMessage({
                command: 'setContent',
                content: documentContent
            });
        }, 2000);

        // 监听文档变化，实时更新webview内容
        const documentChangeListener = vscode.workspace.onDidChangeTextDocument((event) => {
            if (event.document === activeEditor.document) {
                const newContent = event.document.getText();
                // 通过webview的postMessage方法发送新内容
                panel.webview.postMessage({
                    command: 'updateContent',
                    content: newContent
                });
            }
        });

        // 监听webview关闭事件，清理监听器
        panel.onDidDispose(() => {
            documentChangeListener.dispose();
        });

        // 监听webview消息
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'getContent':
                        // 当webview请求内容时，发送当前文档内容
                        panel.webview.postMessage({
                            command: 'setContent',
                            content: documentContent
                        });
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function getHtmlContentForWebview(context: vscode.ExtensionContext, webview: vscode.Webview): string {
    const htmlPath: string = path.join(context.extensionPath, 'resources', 'md', 'index.html');
    const htmlContent: string = fs.readFileSync(htmlPath, 'utf8');
    
    // 更新资源路径
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
