import * as sinon from "sinon";
import chai from "chai";
import chaiHttp = require("chai-http");
import CarController from "../../../controllers/CarController";
import { Car } from "../../../interfaces/CarInterface";
import { ControllerErrors, RequestWithBody } from "../../../controllers";
import { Response } from "express";
import { createSucessfullResponse, errorMock, readCars, sucessfulCarPayload } from "../mocks/car-mocks";
import { verifyInternalError, verifyResponseSucessfully, verifyNotFoundError, verifyRequiredId } from '../utils/index';

chai.use(chaiHttp);

const { expect } = chai;

describe("Car - Camada de Controllers", () => {
  const carControllers = new CarController();
  const request = {} as RequestWithBody<Car>;
  const response = {} as Response;
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub();

  describe("Em caso de sucesso do método CREATE", () => {
    verifyResponseSucessfully({
      method: 'create', mockResponse: createSucessfullResponse, status: 201, body: sucessfulCarPayload
    });

    it("Verifica se a rota é /cars", () => {
      const route = carControllers.route;
      expect(route).to.be.equal('/cars')
    })
  });

  describe('Em caso de FALHA ao chegar "undefined" do CREATE', () => {
    before(() => {
      sinon.stub(carControllers.service, "create").resolves(undefined);
    });

    after(() => {
      (carControllers.service.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método CREATE está retornando o status 400", async () => {
      await carControllers.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
    });
    it("Verifica se o método CREATE está retornando 'Bad Request'", async () => {
      await carControllers.create(request, response);
      expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.badRequest })).to.be.true;
    });
  })

  describe('Em caso de FALHA ao chegar um erro Zod do CREATE', () => {
    before(() => {
      sinon.stub(carControllers.service, "create").resolves(errorMock as never);
    });

    after(() => {
      (carControllers.service.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método CREATE está retornando o status 400", async () => {
      await carControllers.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
    });
    it("Verifica se o método CREATE está retornando 'Bad Request'", async () => {
      await carControllers.create(request, response);
      expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.badRequest })).to.be.true;
    });
  })

  describe('Em caso de FALHA de erro interno no método CREATE', () => {
    verifyInternalError({ method: 'create'});
  })

  describe("Em caso de SUCESSO do método READ", () => {
    verifyResponseSucessfully({ method: 'read', mockResponse: readCars, status: 200 })
  });

  describe("Em caso de FALHA no caso do service retornar null no método READ", () => {
    verifyNotFoundError({ method: 'read' })
  });

  describe("Em caso de FALHA nde erro interno no método READ", () => {
    verifyInternalError({ method:  'read'});
  });

  describe("Em caso de SUCESSO do método READONE", () => {
    verifyResponseSucessfully({
      method: 'readOne', mockResponse: readCars, status: 200, id: '62571c5b062eba865817d0db'
    });
  });

  describe("Em caso de FALHA no caso do service retornar null no método READONE", () => {
    verifyNotFoundError({ method: 'readOne'});
  });

  describe("Em caso de FALHA de erro interno no método READONE", () => {
    verifyInternalError({ method: 'readOne'});
  });

  describe("Em caso de FALHA ao enviar um id inválido no método READONE", () => {
    verifyRequiredId({ method: 'readOne' })
  });

  describe("Em caso de SUCESSO do método UPDATE", () => {
    verifyResponseSucessfully({
      method: 'update', mockResponse: readCars, status: 200, id: '62571c5b062eba865817d0db'
    })
  });

  describe("Em caso de FALHA ao enviar um id inválido no método UPDATE", () => {
    verifyRequiredId({ method: 'update' })

  });

  describe("Em caso de FALHA no caso do service retornar null no método UPDATE", () => {
    verifyNotFoundError({ method: 'update'});
  });

  describe("Em caso de FALHA de erro interno no método UPDATE", () => {
    verifyInternalError({ method: 'update'});
  });

  describe("Em caso de FALHA ao enviar um id inválido no método DELETE", () => {
    verifyRequiredId({ method: 'delete' })
  });

  describe("Em caso de SUCESSO do método DELETE", () => {
    verifyResponseSucessfully({
      method: 'delete', mockResponse: {}, status: 204, id: '62571c5b062eba865817d0db'
    })
  });

  describe("Em caso de FALHA no caso do service retornar null no método DELETE", () => {
    verifyNotFoundError({ method: 'delete'});
  });

  describe("Em caso de FALHA de erro interno no método DELETE", () => {
    verifyInternalError({ method: 'delete'});
  });
});
