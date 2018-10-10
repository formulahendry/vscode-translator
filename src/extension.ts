'use strict';
import * as vscode from 'vscode';
import { TranslatorHoverProvider } from './translatorHoverProvider';
import { Translator } from './translator';

export function activate(context: vscode.ExtensionContext) {

    const translator = new Translator();

    context.subscriptions.push(vscode.languages.registerHoverProvider('*', new TranslatorHoverProvider()))

    context.subscriptions.push(vscode.commands.registerCommand('translator.translate', () => translator.translate()));

    context.subscriptions.push(vscode.commands.registerCommand('translator.toggleCaptureWord', () => translator.toggleCaptureWord()));
}

export function deactivate() {
}