import * as sinon from "sinon";
import chai from "chai";
import chaiHttp = require("chai-http");
import CarController from "../../../controllers/CarController";
import { Car } from "../../../interfaces/CarInterface";
import { ControllerErrors, RequestWithBody } from "../../../controllers";
import { Response, Request } from "express";

chai.use(chaiHttp);
const { expect } = chai;

type Methods = 'read' | 'readOne' | 'create' | 'update';
type sucessfullyObject = { method: Methods, mockResponse: any, status: number, id?: string, body?: any};
type MethodsObject = { method: Methods };

export const verifyInternalError = ({ method }: MethodsObject) => {
  const carControllers = new CarController();
  const request = {} as Request;
  const response = {} as Response;
  if (method === 'readOne') { request.params = { id: '62571c5b062eba865817d0db' } }
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub();

  before(() => sinon.stub(carControllers.service, method).throws('Um erro ocorreu'))

  after(() => {
    (carControllers.service[method] as sinon.SinonStub).restore()
    sinon.restore();
  });

  it(`Verifica se o método ${method.toUpperCase()} está retornando o status 500`, async () => {
    await carControllers[method](request, response);
    expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
  });


  it(`Verifica se o método ${method.toUpperCase()} está retornando um erro interno`, async () => {
    await carControllers[method](request, response);
    expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.internal })).to.be.true;
  });
}

export const verifyResponseSucessfully = ({ method, mockResponse, status, id = '0', body }: sucessfullyObject) => {
  const carControllers = new CarController();
  const request = {} as RequestWithBody<Car>;
  const response = {} as Response;
  if (method === 'readOne') { request.params = { id } }
  if (method === 'create') { request.body = body }
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub();

  before(() => sinon.stub(carControllers.service, method).resolves(mockResponse));

  after(() => {
    (carControllers.service[method] as sinon.SinonStub).restore()
    sinon.restore();
  });

  it(`Verifica se o método ${method} está retornando o status ${status}`, async () => {
    await carControllers[method](request, response);
    expect((response.status as sinon.SinonStub).calledWith(status)).to.be.true;
  });


  it(`Verifica se o método ${method} está retornando o body esperado`, async () => {
    await carControllers[method](request, response);
    expect((response.json as sinon.SinonStub).calledWith(mockResponse)).to.be.true;
  });
}

export const verifyNotFoundError = ({ method }: MethodsObject) => {
  const carControllers = new CarController();
  const request = {} as RequestWithBody<Car>;
  const response = {} as Response;
  if (method === 'readOne') { request.params = { id: '62571c5b062eba865817d0db' } }
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub();

  before(() => sinon.stub(carControllers.service, method).resolves(null as never));

  after(() => {
    (carControllers.service[method] as sinon.SinonStub).restore()
    sinon.restore();
  });

  it("Verifica se o método READ está retornando o status 404", async () => {
    await carControllers[method](request, response);
    expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
  });


  it("Verifica se o método READ está retornando o body esperado", async () => {
    await carControllers[method](request, response);
    expect((response.json as sinon.SinonStub).calledWith({ error: ControllerErrors.notFound })).to.be.true;
  });
}