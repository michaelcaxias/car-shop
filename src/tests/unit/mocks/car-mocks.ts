export const sucessfulCarPayload = {
  model: "bmw",
  year: 1994,
  color: "blue",
  status: true,
  buyValue: 52224,
  doorsQty: 2,
  seatsQty: 2,
};

export const createSucessfullResponse = {
  _id: "6255da496e0a5a5f87d43e72",
  model: "bmw",
  year: 1994,
  color: "blue",
  buyValue: 52224,
  status: true,
  doorsQty: 2,
  seatsQty: 2,
};

export const failedCarPayload = {
  model: "bmw",
  year: 2077,
  color: "blue",
  status: true,
  buyValue: 52224,
  doorsQty: 2,
  seatsQty: 2,
};

export const errorMock = {
  error: {
    issues: [
      {
        code: "too_big",
        maximum: 2022,
        type: "number",
        inclusive: true,
        message: "Value should be less than or equal to 2022",
        path: ["year"],
      },
    ],
    name: "ZodError",
  },
};
