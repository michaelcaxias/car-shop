import { z as zod } from 'zod';

export const VehicleScheme = zod.object({
  model: zod.string().min(3),
  year: zod.number().min(1900).max(2022),
  color: zod.string().min(3),
  status: zod.boolean().optional(),
  buyValue: zod.number().int(),
});

export type Vehicle = zod.infer<typeof VehicleScheme>;
