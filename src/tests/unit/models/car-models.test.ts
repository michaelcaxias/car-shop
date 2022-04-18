import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import chai from "chai";
import chaiHttp = require("chai-http");
import { createSucessfullResponse, sucessfulCarPayload, readCars } from '../mocks/car-mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car - Camada de Models', () => {
  const carModel = new CarModel();
  describe('Em caso de sucesso do método CREATE', () => {
    before(() => {
      sinon.stub(carModel, "create").resolves(createSucessfullResponse)
    })

    after(() => {
      sinon.restore();
    })

    it("Verifica se o método CREATE retorna o que era esperado", async () => {
      const response = await carModel.create(sucessfulCarPayload);
      expect(response).to.deep.equal(createSucessfullResponse)
    })
  })

  describe('Em caso de sucesso do método READ', () => {
    before(() => {
      sinon.stub(carModel, "read").resolves(readCars)
    })

    after(() => {
      sinon.restore();
    })

    it("Verifica se o método READ retorna o que era esperado", async () => {
      const response = await carModel.read();
      expect(response).to.deep.equal(readCars)
    })
  })
})