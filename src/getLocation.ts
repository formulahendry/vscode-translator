import path = require('path');
import fs = require('fs');
import * as vscode from 'vscode';
// import util from './util'

export class GetLocation {
  private fileName: string;
  private workDir: string;
  private word: string;
  private line: vscode.TextLine;
  private document: vscode.TextDocument;

  constructor(document: vscode.TextDocument, position: vscode.Position) {
    this.document = document;
    this.fileName = document.fileName;
    this.workDir = path.dirname(this.fileName);
    this.word = document.getText(document.getWordRangeAtPosition(position));
    this.line = document.lineAt(position);
    // this.projectPath = util.getProjectPath(document);
    console.log(this.fileName, this.workDir, this.word, this.line, this.document);
  }

  getPosition() {
      // 只处理package.json文件
    if (/\/package\.json$/.test(this.fileName)) {
      console.log(this.word, this.line.text);
      const json = this.document.getText();
      if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${this.word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
        let destPath = `${this.workDir}/node_modules/${this.word.replace(/"/g, '')}/package.json`;
        if (fs.existsSync(destPath)) {
            // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
            return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
        }
      }
    }
  }
}