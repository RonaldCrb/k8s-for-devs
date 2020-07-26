import { Request, Response, Router } from 'express';
import moment = require('moment');

class HomeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get('/healthz', this.healthz);
    this.router.get('/', this.home);
  }

  // home endpoint
  public async home(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'Hello telepresence demo',
      timestamp: moment().format('dddd - MMMM Do YYYY, h:mm:ss a'),
    });
  }

  // healthz endpoint
  public async healthz(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'healthy',
      timestamp: moment().format('dddd - MMMM Do YYYY, h:mm:ss a'),
    });
  }

}

const homeRoutes = new HomeRoutes();
homeRoutes.routes();

export default homeRoutes.router;
