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

  create = (_req: RequestWithBody<Car>, res: Response<Car | ResponseError>) => {
    const { status, data } = CarServices.create();
    if (status >= 400) {
      return res.status(status).json({ message: data });
    }
    return res.status(200).json(data);
  };
}
