import express from 'express';
import MasterRouter from './routers/MasterRouter';
import cors from 'cors';
import 'express-async-errors';
import Youch from 'youch';
import 'dotenv/config';
require('dotenv').config()
class App {
  server: any;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.disable('x-powered-by');
    this.server.use(cors());
    this.server.use(express.json());
  }
  
  /**
   * Base routes definition
   */
  routes() {
    this.server.use(MasterRouter);
  }

  /**
   * Default exception handler (that method prevent the app from breaking)
   */
  exceptionHandler() {
    this.server.use(async (err: any, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string | { message: string; name: string; status: number; frames: { file: string; filePath: string; method: string; line: number; column: number; context: { start: number; pre: string; line: string; post: string; }; isModule: boolean; isNative: boolean; isApp: boolean; }[]; }; }): any; new(): any; }; }; }, _next: any) => {
      if (process.env.NODE_ENV === 'dev') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
