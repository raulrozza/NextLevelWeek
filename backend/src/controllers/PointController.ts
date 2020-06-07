import knex from '../database/connection';
import { Request, Response } from 'express';
import { ADDRESS } from '../../config';

class PointController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    try {
      const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.id_point')
        .whereIn('point_items.id_item', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `${ADDRESS}/uploads/${point.image}`,
        };
      });

      return res.json(serializedPoints);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const point = await knex('points').where('id', id).first();

      if (!point) throw new Error('Could not find point');

      const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.id_item')
        .where('point_items.id_point', id)
        .select('items.title');

      point.image_url = `${ADDRESS}/uploads/${point.image}`;
      point.items = items;

      return res.json(point);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async store(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
      items,
    } = req.body;

    try {
      const trx = await knex.transaction();

      const point = {
        image: req.file.filename,
        name,
        email,
        whatsapp,
        city,
        uf,
        latitude,
        longitude,
      };

      const [pointId] = await trx('points').insert(point);

      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((itemId: number) => {
          return {
            id_item: itemId,
            id_point: pointId,
          };
        });

      await trx('point_items').insert(pointItems);

      await trx.commit();

      return res.json({
        ...point,
        id: pointId,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
}

export default PointController;
