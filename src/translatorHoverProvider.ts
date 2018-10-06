'use strict';
import { Hover, HoverProvider, Position, TextDocument } from 'vscode';
import * as Constants from './constants';
import { Translator } from './translator';
import { Utility } from './utility';

export class TranslatorHoverProvider implements HoverProvider {

    public async provideHover(document: TextDocument, position: Position): Promise<Hover> {
        if (Utility.getConfiguration().get(Constants.CaptureWordKey)) {
            const source = document.getText(document.getWordRangeAtPosition(position));
            if (source) {
                return new Hover(await Translator.translate(source));
            }
        }
        return new Hover("");
    }
}