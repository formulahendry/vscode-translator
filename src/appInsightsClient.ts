"use strict";
import appInsights = require("applicationinsights");
import * as vscode from "vscode";
import * as Constants from './constants';

export class AppInsightsClient {
    public static sendEvent(eventName: string, properties?: { [key: string]: string; }): void {
        if (this._enableTelemetry) {
            this._client.trackEvent({ name: eventName, properties });
        }
    }

    private static _client = new appInsights.TelemetryClient(Constants.AiKey);
    private static _enableTelemetry = vscode.workspace.getConfiguration("telemetry").get<boolean>("enableTelemetry");
}