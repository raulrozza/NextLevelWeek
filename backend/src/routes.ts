import express from 'express';

// Controllers
import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();

// Items
routes.get('/items', itemController.index);

// Points
routes.post('/points', pointController.store);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

export default routes;
