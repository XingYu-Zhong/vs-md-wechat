    console.log('vs-md extension is now active!');
    
    // 本地版编辑器命令
    let localDisposable = vscode.commands.registerCommand('extension.showLocalWebview', () => {
        console.log('extension.showLocalWebview command triggered!');
        vscode.window.showInformationMessage('正在启动微信Markdown编辑器(本地版)...');
        
        try {
            const panel = vscode.window.createWebviewPanel(
                'vs-md-wechat-local',
                '微信 Markdown 编辑器 (本地版)',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    localResourceRoots: [
                        vscode.Uri.file(path.join(context.extensionPath, 'resources', 'md')),
                    ]
                }
            );
    
            const localHtmlPath = path.join(context.extensionPath, 'resources', 'md', 'local.html');
            const localHtmlContent = fs.readFileSync(localHtmlPath, 'utf8');
            panel.webview.html = localHtmlContent;
            
            // 获取当前编辑器中的Markdown内容
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor && activeEditor.document.languageId === 'markdown') {
                const currentMarkdownContent = activeEditor.document.getText();
                // 等待webview加载完成后发送内容
                setTimeout(() => {
                    panel.webview.postMessage({
                        command: 'loadMarkdown',
                        content: currentMarkdownContent
                    });
                }, 1000);
            } else {
                console.log('No markdown file is currently open');
            }
            
            // 监听来自webview的消息
            panel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'log':
                            console.log('Local webview log:', message.text);
                            vscode.window.showInformationMessage(message.text);
                            return;
                        case 'requestCurrentMarkdown':
                            // 当webview请求当前Markdown内容时
                            const editor = vscode.window.activeTextEditor;
                            if (editor && editor.document.languageId === 'markdown') {
                                const content = editor.document.getText();
                                panel.webview.postMessage({
                                    command: 'loadMarkdown',
                                    content: content
                                });
                            } else {
                                vscode.window.showWarningMessage('请先打开一个 Markdown 文件');
                            }
                            return;
                    }
                },
                undefined,
                context.subscriptions
            );
        } catch (error) {
            console.error('Error creating local webview:', error);
            vscode.window.showErrorMessage(`创建webview时出错: ${error}`);
>>>>>>> b80fb56 (feat(localWebview): 添加本地版微信Markdown编辑器支持)
        }
    });

    context.subscriptions.push(localDisposable);
}

export function deactivate() {}
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    console.log('vs-md extension is now active!');
    
    // 本地版编辑器命令
    let localDisposable = vscode.commands.registerCommand('extension.showLocalWebview', () => {
        console.log('extension.showLocalWebview command triggered!');
        vscode.window.showInformationMessage('正在启动微信Markdown编辑器(本地版)...');
        
        try {
            const panel = vscode.window.createWebviewPanel(
                'vs-md-wechat-local',
                '微信 Markdown 编辑器 (本地版)',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    localResourceRoots: [
                        vscode.Uri.file(path.join(context.extensionPath, 'resources', 'md')),
                    ]
                }
            );
    
            const localHtmlPath = path.join(context.extensionPath, 'resources', 'md', 'local.html');
            const localHtmlContent = fs.readFileSync(localHtmlPath, 'utf8');
            panel.webview.html = localHtmlContent;
            
            // 获取当前编辑器中的Markdown内容
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor && activeEditor.document.languageId === 'markdown') {
                const currentMarkdownContent = activeEditor.document.getText();
                // 等待webview加载完成后发送内容
                setTimeout(() => {
                    panel.webview.postMessage({
                        command: 'loadMarkdown',
                        content: currentMarkdownContent
                    });
                }, 1000);
            } else {
                console.log('No markdown file is currently open');
            }
            
            // 监听来自webview的消息
            panel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'log':
                            console.log('Local webview log:', message.text);
                            vscode.window.showInformationMessage(message.text);
                            return;
                        case 'requestCurrentMarkdown':
                            // 当webview请求当前Markdown内容时
                            const editor = vscode.window.activeTextEditor;
                            if (editor && editor.document.languageId === 'markdown') {
                                const content = editor.document.getText();
                                panel.webview.postMessage({
                                    command: 'loadMarkdown',
                                    content: content
                                });
                            } else {
                                vscode.window.showWarningMessage('请先打开一个 Markdown 文件');
                            }
                            return;
                    }
                },
                undefined,
                context.subscriptions
            );
        } catch (error) {
            console.error('Error creating local webview:', error);
            vscode.window.showErrorMessage(`创建webview时出错: ${error}`);
        }
    });

    context.subscriptions.push(localDisposable);
}

export function deactivate() {}
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
=======
    console.log('vs-md extension is now active!');
    
    // 本地版编辑器命令
    let localDisposable = vscode.commands.registerCommand('extension.showLocalWebview', () => {
        console.log('extension.showLocalWebview command triggered!');
        vscode.window.showInformationMessage('正在启动微信Markdown编辑器(本地版)...');
        
        try {
            const panel = vscode.window.createWebviewPanel(
                'vs-md-wechat-local',
                '微信 Markdown 编辑器 (本地版)',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    localResourceRoots: [
                        vscode.Uri.file(path.join(context.extensionPath, 'resources', 'md')),
                    ]
                }
            );
    
            const localHtmlPath = path.join(context.extensionPath, 'resources', 'md', 'local.html');
            const localHtmlContent = fs.readFileSync(localHtmlPath, 'utf8');
            panel.webview.html = localHtmlContent;
            
            // 获取当前编辑器中的Markdown内容
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor && activeEditor.document.languageId === 'markdown') {
                const currentMarkdownContent = activeEditor.document.getText();
                // 等待webview加载完成后发送内容
                setTimeout(() => {
                    panel.webview.postMessage({
                        command: 'loadMarkdown',
                        content: currentMarkdownContent
                    });
                }, 1000);
            } else {
                console.log('No markdown file is currently open');
            }
            
            // 监听来自webview的消息
            panel.webview.onDidReceiveMessage(
                message => {
                    switch (message.command) {
                        case 'log':
                            console.log('Local webview log:', message.text);
                            vscode.window.showInformationMessage(message.text);
                            return;
                        case 'requestCurrentMarkdown':
                            // 当webview请求当前Markdown内容时
                            const editor = vscode.window.activeTextEditor;
                            if (editor && editor.document.languageId === 'markdown') {
                                const content = editor.document.getText();
                                panel.webview.postMessage({
                                    command: 'loadMarkdown',
                                    content: content
                                });
                            } else {
                                vscode.window.showWarningMessage('请先打开一个 Markdown 文件');
                            }
                            return;
                    }
                },
                undefined,
                context.subscriptions
            );
        } catch (error) {
            console.error('Error creating local webview:', error);
            vscode.window.showErrorMessage(`创建webview时出错: ${error}`);
>>>>>>> b80fb56 (feat(localWebview): 添加本地版微信Markdown编辑器支持)
        }
    });

    context.subscriptions.push(localDisposable);
}

export function deactivate() {}