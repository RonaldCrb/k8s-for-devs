import express from 'express';
import morgan from 'morgan';
// active routers
import homeRoutes from './routes/homeRoutes';

class Server {
  public app: express.Application;
  private PORT: string | number;

  constructor() {
    this.app = express();
    this.config();
  }

  public async start(): Promise<void> {
    await this.app.listen(this.PORT, () => {
      console.log(`API ONLINE at http://localhost:${this.PORT}`);
    });
  }

  private config(): void {
    // Settings
    this.PORT = process.env.PORT || 3030;
    this.app.set('port', this.PORT);

    // Middlewares
    this.app.use(morgan('dev'));
    this.app.use(express.json({ limit: '150mb' })); // el tamaño maximo de los requests a 150 mb
    this.app.use(express.urlencoded({ extended: true, limit: '150mb' })); // el tamaño maximo de los requests a 150 mb

    // Routers
    this.app.use('/', homeRoutes);
  }
}

const server = new Server();

server.start();
