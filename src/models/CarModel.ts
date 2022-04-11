import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document { }

const carScheme = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: { type: String, required: false },
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carScheme)) {
    super(model);
  }
}

export default CarModel;