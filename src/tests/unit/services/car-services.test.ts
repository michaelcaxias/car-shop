import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from "sinon";
import CarService from '../../../services/CarServices';
import { createSucessfullResponse, sucessfulCarPayload } from '../mocks/car-mocks';
import { carScheme } from '../../../interfaces/CarInterface';

describe("Car - Camada de Services", () => {
  const carService = new CarService();
  describe("Testes em método create em caso de sucesso", () => {
    before(() => {
      sinon.stub(carService, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      (carService.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o retorno do método create está com o payload correto", async () => {
      const carData = await carService.create(sucessfulCarPayload);
      expect(carData).to.be.deep.equal(createSucessfullResponse);
    });
  });
  describe('Testes em método create em casos de falha', () => {
    before(() => {
      sinon.stub(carScheme, "safeParse").resolves(createSucessfullResponse);
    });

    after(() => {
      sinon.restore();
    });

    it("...", async () => {
    });
  })
});
