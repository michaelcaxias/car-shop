import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from "sinon";
import CarService from '../../../services/CarServices';
import { createSucessfullResponse } from '../mocks/car-mocks';

describe("Car - Camada de Services", () => {
  const carService = new CarService();
  describe("Testes em caso de sucesso", () => {
    before(() => {
      sinon.stub(carService, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      (carService.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("...", async () => {
    });
  });
  describe('Testes em caso de falha', () => {
    before(() => {
      sinon.stub(carService, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      (carService.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("...", async () => {
    });
  })
});
