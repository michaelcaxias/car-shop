import { Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import CarServices from '../services/CarServices';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(
    service = new CarServices(),
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
      const data = await this.service.create(body);
      if (!data) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}
