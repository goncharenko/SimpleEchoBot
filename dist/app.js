"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const express = require("express");
class App {
    constructor() {
        this.connector = new builder.ChatConnector({
            appId: process.env.MICROSOFT_APP_ID,
            appPassword: process.env.MICROSOFT_APP_PASSWORD
        });
        this.connectorListener = this.connector.listen();
        this.bot = new builder.UniversalBot(this.connector, (session) => {
            session.send("You said: %s", session.message.text);
        });
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.send('I\'m Simple Echo Bot!');
        });
        router.post('/api/messages', (res, req) => {
            this.connectorListener(res, req);
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
