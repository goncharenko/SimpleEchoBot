import * as builder from 'botbuilder';
import * as express from 'express';

class App {
  private bot: builder.UniversalBot;
  private connector: builder.ChatConnector;
  private connectorListener: any;

  public express;

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

  private mountRoutes(): void {
    const router = express.Router();
    router.post('/api/messages', (res, req) => {
      this.connectorListener(res, req);
    });
    this.express.use('/', router);
  }
}

export default new App().express;
