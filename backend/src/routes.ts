import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

// Controllers
import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

// Config
import config from './config/upload';

const routes = express.Router();
const pointController = new PointController();
const itemController = new ItemController();
const upload = multer(config);

// Items
routes.get('/items', itemController.index);

// Points
routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required,
        longitute: Joi.number().required,
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointController.store,
);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

export default routes;
