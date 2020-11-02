import path = require('path');
import * as vscode from 'vscode';
// import fs from 'fs'
// import util from './util'

export class GetLocation {
  private fileName: string;
  private workDir: string;
  private word: string;
  public static needGuess: Boolean;
  constructor(document: vscode.TextDocument, position: vscode.Position) {
    this.fileName = document.fileName;
    this.workDir = path.dirname(this.fileName);
    this.word = document.getText(document.getWordRangeAtPosition(position));
    console.log(this.fileName, this.workDir, this.word);
  }
}