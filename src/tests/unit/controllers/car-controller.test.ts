import * as sinon from "sinon";
import chai from "chai";
import chaiHttp = require("chai-http");
import CarController from "../../../controllers/CarController";
import CarService from "../../../services/CarServices";
import { Car } from "../../../interfaces/CarInterface";
import { RequestWithBody } from "../../../controllers";
import { Response } from "express";
import { createSucessfullResponse } from "../mocks/car-mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe("Sua descrição", () => {
  describe("first", () => {
    const carControllers = new CarController();
    const request = {} as RequestWithBody<Car>;
    const response = {} as Response;
    before(async () => {
      request.body = {
        model: "bmw",
        year: 1994,
        color: "blue",
        status: true,
        buyValue: 52224,
        doorsQty: 2,
        seatsQty: 2,
      };

      sinon.stub(carControllers.service, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      sinon.restore();
    });

    it("", async () => {});
  });
});
