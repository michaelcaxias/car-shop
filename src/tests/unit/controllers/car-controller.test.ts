import * as sinon from "sinon";
import chai from "chai";
import chaiHttp = require("chai-http");
import CarController from "../../../controllers/CarController";
import { Car } from "../../../interfaces/CarInterface";
import { ControllerErrors, RequestWithBody } from "../../../controllers";
import { Response } from "express";
import { createSucessfullResponse, errorMock, readCars, sucessfulCarPayload } from "../mocks/car-mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe("Car - Camada de Controllers", () => {
  const carControllers = new CarController();
  const request = {} as RequestWithBody<Car>;
  const response = {} as Response;
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub();

  describe("Em caso de sucesso do método CREATE", () => {
    before(() => {
      request.body = sucessfulCarPayload;
      sinon.stub(carControllers.service, "create").resolves(createSucessfullResponse);
    });

    after(() => {
      (carControllers.service.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método CREATE está retornando o status 201", async () => {
      await carControllers.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(createSucessfullResponse)).to.be.true;
    });


    it("Verifica se o método CREATE está retornando o body esperado", async () => {
      await carControllers.create(request, response);
      expect((response.json as sinon.SinonStub).calledWith(createSucessfullResponse)).to.be.true;
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
  describe('Em caso de FALHA no caso do service lançar um erro no método CREATE', () => {

    before(() => sinon.stub(carControllers.service, "create").throws());

    after(() => {
      (carControllers.service.create as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método CREATE está retornando o status 500", async () => {
      await carControllers.create(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
    });
    it("Verifica se o método CREATE está retornando um erro interno", async () => {
      await carControllers.create(request, response);
      expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.internal })).to.be.true;
    });
  })
  describe("Em caso de SUCESSO do método READ", () => {

    before(() => sinon.stub(carControllers.service, "read").resolves(readCars));

    after(() => {
      (carControllers.service.read as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método READ está retornando o status 200", async () => {
      await carControllers.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });


    it("Verifica se o método READ está retornando o body esperado", async () => {
      await carControllers.read(request, response);
      expect((response.json as sinon.SinonStub).calledWith(readCars)).to.be.true;
    });
  });
  describe("Em caso de FALHA no caso do service retornar null no método READ", () => {

    before(() => sinon.stub(carControllers.service, "read").resolves(null as never));

    after(() => {
      (carControllers.service.read as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método READ está retornando o status 404", async () => {
      await carControllers.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
    });


    it("Verifica se o método READ está retornando o body esperado", async () => {
      await carControllers.read(request, response);
      expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.notFound })).to.be.true;
    });
  });
  describe("Em caso de FALHA no caso do service lançar um erro no método READ", () => {

    before(() => sinon.stub(carControllers.service, "read").throws('Um erro ocorreu'))

    after(() => {
      (carControllers.service.read as sinon.SinonStub).restore()
      sinon.restore();
    });

    it("Verifica se o método READ está retornando o status 500", async () => {
      await carControllers.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
    });


    it("Verifica se o método READ está retornando um erro interno", async () => {
      await carControllers.read(request, response);
      expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.internal })).to.be.true;
    });
  });
});
