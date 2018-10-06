'use strict';
import axios from "axios";
import * as vscode from 'vscode';
import * as Constants from './constants';
import { Utility } from "./utility";
import { AppInsightsClient } from "./appInsightsClient";

export class Translator {
    private outputChannel: vscode.OutputChannel;
    private captureWordStatusBarItem: vscode.StatusBarItem;

    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('Translator');
        this.captureWordStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, -999999);
        this.captureWordStatusBarItem.text = Utility.getConfiguration().get(Constants.CaptureWordKey) ? Constants.CaptureWordText : Constants.NotCaptureWordText;
        this.captureWordStatusBarItem.command = 'translator.toggleCaptureWord';
        this.captureWordStatusBarItem.show();
    }

    public async translate() {
        AppInsightsClient.sendEvent('translate');
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const selection = editor.selection;
        const text = selection.isEmpty ? editor.document.getText() : editor.document.getText(editor.selection);
        const target = await Translator.translate(text);
        this.outputChannel.show();
        this.outputChannel.appendLine(target);
        this.outputChannel.appendLine('\n');
    }

    public static async translate(source: string): Promise<string> {
        const result = (await axios.get(`https://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${encodeURIComponent(source)}`)).data;
        return result['translateResult'].map((translateResult: any) => translateResult.map((sentence: any) => sentence['tgt']).join('')).join('\n');
    }

    public toggleCaptureWord() {
        AppInsightsClient.sendEvent('toggleCaptureWord');
        if (this.captureWordStatusBarItem.text === Constants.CaptureWordText) {
            this.captureWordStatusBarItem.text = Constants.NotCaptureWordText;
        } else {
            this.captureWordStatusBarItem.text = Constants.CaptureWordText;
        }
        const config = Utility.getConfiguration();
        config.update(Constants.CaptureWordKey, !config.get(Constants.CaptureWordKey), true);
    }
}