import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import chai from "chai";
import chaiHttp = require("chai-http");
import { createSucessfullResponse, sucessfulCarPayload, readCars } from '../mocks/car-mocks';
import mongoose from 'mongoose';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car - Camada de Models', () => {
  const carModel = new CarModel();
  describe('Em caso de sucesso do método CREATE', () => {
    before(() => {
      sinon.stub(mongoose.Model, "create").resolves(createSucessfullResponse)
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
      sinon.stub(mongoose.Model, "find").resolves(readCars)
    })

    after(() => {
      sinon.restore();
    })

    it("Verifica se o método READ retorna o que era esperado", async () => {
      const response = await carModel.read();
      expect(response).to.deep.equal(readCars)
    })
  })

  
  describe('Em caso de sucesso do método READONE', () => {
    before(() => {
      sinon.stub(mongoose.Model, "findOne").resolves(readCars[0])
    })

    after(() => {
      sinon.restore();
    })

    it("Verifica se o método READONE retorna o que era esperado", async () => {
      const response = await carModel.readOne('6255f49b9c3c804d9a067e69');
      expect(response).to.deep.equal(readCars[0])
    })
  })

  describe('Em caso de sucesso do método UPDATE', () => {
    before(() => {
      sinon.stub(mongoose.Model, "findOneAndUpdate").resolves(sucessfulCarPayload)
    })

    after(() => {
      sinon.restore();
    })

    it("Verifica se o método UPDATE retorna o que era esperado", async () => {
      const response = await carModel.update('6255f49b9c3c804d9a067e69', sucessfulCarPayload);
      expect(response).to.deep.equal(createSucessfullResponse)
    })
  })

  describe('Em caso de sucesso do método DELETE', () => {
    before(() => {
      sinon.stub(mongoose.Model, "findOneAndDelete").resolves('')
    })

    after(() => {
      sinon.restore();
    })

    it("Verifica se o método DELETE retorna o que era esperado", async () => {
      const response = await carModel.delete('6255f49b9c3c804d9a067e69');
      expect(response).to.deep.equal('')
    })
  })
})