import * as sinon from "sinon";
import chai from "chai";
import chaiHttp = require("chai-http");
import CarController from "../../../controllers/CarController";
import CarService from "../../../services/CarServices";
import { Car } from "../../../interfaces/CarInterface";
import { ControllerErrors, RequestWithBody } from "../../../controllers";
import { Response } from "express";
import { createSucessfullResponse, sucessfulCarPayload } from "../mocks/car-mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe("Car - Camada de Controllers", () => {
  describe("Testes em caso de sucesso", () => {
    const carControllers = new CarController();
    const request = {} as RequestWithBody<Car>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    before(() => {
      request.body = sucessfulCarPayload;
      sinon.stub(carControllers.service, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      (carControllers.service.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método create está funcionando corretamente", async () => {
      await carControllers.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(createSucessfullResponse)).to.be.true;
    });
  });
  describe('Testes em caso de falha', () => {
    const carControllers = new CarController();
    const request = {} as RequestWithBody<Car>;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    before(() => {
      sinon.stub(carControllers.service, "create").resolves(undefined);
    });

    after(() => {
      (carControllers.service.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método create está funcionando corretamente", async () => {
      await carControllers.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.badRequest })).to.be.true;
    });
  })
});
