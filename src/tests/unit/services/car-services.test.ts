import { expect } from 'chai';
import * as sinon from "sinon";
import CarService from '../../../services/CarServices';
import { createSucessfullResponse, sucessfulCarPayload, errorMock, failedCarPayload } from '../mocks/car-mocks';
import { carScheme } from '../../../interfaces/CarInterface';

describe("Car - Camada de Services", () => {
  const carService = new CarService();
  describe("Em método CREATE em caso de SUCESSO", () => {
    before(() => {
      sinon.stub(carService.model, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      (carService.model.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o retorno do método create está com o payload correto", async () => {
      const carData = await carService.create(sucessfulCarPayload);
      expect(carData).to.be.deep.equal(createSucessfullResponse);
    });
  });
  describe('Em método CREATE em casos de FALHA', () => {
    before(() => {
      sinon.stub(carScheme, "safeParse").resolves(errorMock);
    });

    after(() => {
      sinon.restore();
    });

    it("Verifica se o retorno do método CREATE é um erro", async () => {
      const carData = await carService.create(failedCarPayload);
      expect(carData).to.have.property('error');
    });
  })
});
