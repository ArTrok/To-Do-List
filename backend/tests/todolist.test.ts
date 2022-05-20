import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';
import TaskModel from '../src/models/todolist';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const axiosGetMock = [{
  id: 1,
  title: "My first activity",
  date: "06/06/2022",
  time: "12:00",
  details: "A very important activity that will change my life",
  status: "in progress",
  creationAt: "06/06/2022",
},
{
  id: 2,
  title: "My second activity",
  date: "07/06/2022",
  time: "13:00",
  details: "An important activity that will change my life too",
  status: "pending",
  createdAt: "06/06/2022",
}];

describe('When accessing POST, PUT, DELETE and GET main endpoint', () => {
  let chaiHttpResponse: Response;
  describe('successful response', () => {
    before(async () => {
      sinon.stub(TaskModel, 'getAll').resolves(axiosGetMock as TaskModel)

      chaiHttpResponse = await chai.request(app)
        .get('/').send()
    })
    after(() => {
      (TaskModel.getAll as sinon.SinonStub).restore();
    })

    it('Should respond with status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    })
    it('Should return correct data', () => {
      expect(chaiHttpResponse.body.user).to.be.deep.equal(axiosGetMock)
      expect(chaiHttpResponse.body[0]).to.have.property('id')
      expect(chaiHttpResponse.body[0]).to.have.property('title')
      expect(chaiHttpResponse.body[0]).to.have.property('details')
      expect(chaiHttpResponse.body[0]).to.have.property('date')
      expect(chaiHttpResponse.body[0]).to.have.property('time')
      expect(chaiHttpResponse.body[0]).to.have.property('status')
      expect(chaiHttpResponse.body[0]).to.have.property('createdAt')
    })
  })
});
