import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarServices from '../services/CarServices';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    public service = new CarServices(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { body } = req;
    try {
      const carData = await this.service.create(body);
      if (!carData) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      if ('error' in carData) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      return res.status(201).json(carData);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: RequestWithBody<Car>,
    res: Response<Car[] | ResponseError>,
  ) => {
    try {
      const carData = await this.service.read();
      if (!carData) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(carData);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { id } = req.params;
    if (!id || id.length < 24) {
      return res.status(400).json({ error: this.errors.requiredId });
    }
    try {
      const carData = await this.service.readOne(id);
      if (!carData) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(carData);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ) => {
    const { id } = req.params;
    if (!id || id.length < 24) {
      return res.status(400).json({ error: this.errors.requiredId });
    }
    try {
      const carData = await this.service.update(id, req.body);
      if (!carData) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(carData);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
