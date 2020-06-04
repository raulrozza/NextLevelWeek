import knex from '../database/connection';
import { Request, Response } from 'express';
import { ADDRESS } from '../../config';

class ItemController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    try {
      const serializedItems = items.map(item => {
        return {
          ...item,
          image_url: `${ADDRESS}/uploads/${item.image}`,
        };
      });

      return res.json(serializedItems);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default ItemController;
