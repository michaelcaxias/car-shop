import { z as zod } from 'zod';
import { VehicleScheme } from './VehicleInterface';

const carScheme = VehicleScheme.extend({
  doorsQty: zod.number().min(2).max(4),
  seatsQty: zod.number().min(2).max(7),
});

export type Car = zod.infer<typeof carScheme>;