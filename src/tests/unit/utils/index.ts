import * as sinon from "sinon";
import chai from "chai";
import chaiHttp = require("chai-http");
import CarController from "../../../controllers/CarController";
import { Car } from "../../../interfaces/CarInterface";
import { ControllerErrors, RequestWithBody } from "../../../controllers";
import { Response } from "express";

chai.use(chaiHttp);
const { expect } = chai;

type Methods = 'read' | 'readOne' | 'create';

export const verifyInternalError = (method: Methods) => {
  const carControllers = new CarController();
  const request = {} as RequestWithBody<Car>;
  const response = {} as Response;
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
