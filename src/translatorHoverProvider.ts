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
                const translateResult = await Translator.translate(source);
                if(Translator.needGuess) {
                    const formatText = source.replace(/([A-Z])/g," $1").replace(/([\-\_\.])/g," ").toLowerCase();
                    const target2 = await Translator.translate(formatText, true);
                    Translator.needGuess = false;
                    return new Hover(`${translateResult}(您可能想要的结果是${formatText}=>${target2})`);
                }
                return new Hover(translateResult);
            }
        }
        return new Hover("");
    }
}