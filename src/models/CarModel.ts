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
}, { versionKey: false });

// https://stackoverflow.com/questions/13699784/mongoose-v-property-hide#:~:text=You%20can%20disable%20the%20%22__,%7D%2C%20%7B%20versionKey%3A%20false%20%7D)%3B

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carScheme)) {
    super(model);
  }
}

export default CarModel;