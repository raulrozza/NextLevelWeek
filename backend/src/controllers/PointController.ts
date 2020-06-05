import knex from '../database/connection';
import { Request, Response } from 'express';

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

      return res.json(points);
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
        image: 'image',
        name,
        email,
        whatsapp,
        city,
        uf,
        latitude,
        longitude,
      };

      const [pointId] = await trx('points').insert(point);

      const pointItems = items.map((itemId: number) => {
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
      return res.status(400).json(error);
    }
  }
}

export default PointController;
