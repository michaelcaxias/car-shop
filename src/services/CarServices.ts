import { Car, carScheme } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = carScheme.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  };

  read = async (): Promise<Car[]> => this.model.read();
}

export default CarService;