import { Router } from 'express';
import ThemeARouter from './themeArouters/ThemeARouter';
import ThemeBRouter from './themeBrouters/ThemeBRouter';
import HomeRouter from './homeRouter/HomeRouter';

class MasterRouter {
  private _router = Router();
  private _subrouterA = ThemeARouter;
  private _subrouterB = ThemeBRouter;
  private _homerouter = HomeRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/themeA', this._subrouterA);
    this._router.use('/themeB', this._subrouterB);
    this._router.use('/', this._homerouter)
  }
}
export = new MasterRouter().router;