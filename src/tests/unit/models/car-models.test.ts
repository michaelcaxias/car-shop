import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import chai from "chai";
import chaiHttp = require("chai-http");
import { createSucessfullResponse, sucessfulCarPayload } from '../mocks/car-mocks';

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

    it("Verifica se o método CREATE retorna o que era esperado", () => {
      const response = carModel.create(sucessfulCarPayload);
      expect(response).to.deep.equal(createSucessfullResponse)
    })
  })
})