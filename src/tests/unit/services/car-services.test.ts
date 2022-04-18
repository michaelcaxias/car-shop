import { expect } from 'chai';
import * as sinon from "sinon";
import CarService from '../../../services/CarServices';
import { createSucessfullResponse, sucessfulCarPayload, errorMock, failedCarPayload, readCars } from '../mocks/car-mocks';
import { carScheme } from '../../../interfaces/CarInterface';
import { verifyServiceSucessfully } from '../utils/index';

describe("Car - Camada de Services", () => {
  const carService = new CarService();
  describe("Em método CREATE em caso de SUCESSO", () => {
    verifyServiceSucessfully({
      method: 'create',
      mockResponse: createSucessfullResponse,
      body: sucessfulCarPayload,
    })
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

  describe("Em método UPDATE em caso de SUCESSO", () => {
    verifyServiceSucessfully({
      method: 'update',
      mockResponse: createSucessfullResponse,
      body: sucessfulCarPayload,
      id: '625db3421a8051968670e2ca',
    })
  });

  describe('Em método UPDATE em casos de FALHA', () => {
    before(() => {
      sinon.stub(carScheme, "safeParse").resolves(errorMock);
    });

    after(() => {
      sinon.restore();
    });

    it("Verifica se o retorno do método UPDATE é um erro", async () => {
      const carData = await carService.update('625db3421a8051968670e2ca', failedCarPayload);
      expect(carData).to.have.property('error');
    });
  })

  describe("Em método READ em caso de SUCESSO", () => {
    verifyServiceSucessfully({
      method: 'read',
      mockResponse: readCars,
    })
  });

  describe("Em método READONE em caso de SUCESSO", () => {
    verifyServiceSucessfully({
      method: 'readOne',
      mockResponse: readCars[0],
      id: '6255f49b9c3c804d9a067e69',
    })
  });
});
