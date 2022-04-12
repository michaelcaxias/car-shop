import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { expect } = chai;

describe('Sua descrição', () => {
  describe('first', () => {
    before(async () => {
      sinon.stub().resolves();
    });
  
    after(()=>{
      sinon.restore();
    })
  
    it('', async () => {});
  })
});