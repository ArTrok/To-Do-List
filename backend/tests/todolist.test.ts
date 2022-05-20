import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../src/app';
import TaskModel from '../src/models/todolist';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('When accessing POST and GET /login endpoint', () => {
  let chaiHttpResponse: Response;
  describe('successful response', () => {
    before(async () => {
      sinon.stub(TaskModel, 'findOne').resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: '1234567',
        } as TaskModel)

      chaiHttpResponse = await chai.request(app)
        .post('/login').send({
          email: 'admin@admin.com',
          password: '1234567'
        })
    })
    after(() => {
      (TaskModel.findOne as sinon.SinonStub).restore();
    })

    it('Should respond with status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    })
    it('Should return correct data', () => {
      expect(chaiHttpResponse.body.user).to.be.deep.equal({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        })
      expect(chaiHttpResponse.body).to.have.property('user')
      expect(chaiHttpResponse.body).to.have.property('token')
    })
  })

  describe('Failing response', async () => {
    before( async () => {
      sinon.stub(TaskModel, 'findOne').resolves({} as TaskModel)
    })
    after(() => {
      (TaskModel.findOne as sinon.SinonStub).restore();
    })

    it('Should return error message when email is incorrect', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login').send({
        email: 'admin.com',
        password: '1234567'
      })
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Incorrect email or password'})
    })
    it('Should return error message when password is incorrect', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login').send({
        email: 'admin@admin.com',
        password: '1234'
      })
      expect(chaiHttpResponse.body).to.be.equal({ message: 'Incorrect email or password'})
    })
  })

  describe('Missing fields response', async () => {
    before( async () => {
      sinon.stub(TaskModel, 'findOne').resolves({} as TaskModel)
    })
    after(() => {
      (TaskModel.findOne as sinon.SinonStub).restore();
    })

    it('Should return error message when email is missing', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login').send({
        password: '1234567',
      })
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.equal({ message: 'All fields must be filled'});
    })
    it('Should return error message when password is missing', async () => {
      chaiHttpResponse = await chai.request(app)
      .post('/login').send({
        email: 'admin@admin.com',
      })
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.equal({ message: 'All fields must be filled'});
    })
  })

  describe('Login validate response', async () => {
    before( async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set({authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4ifQ.TAx2m1xFsWEGjDQPXyo2E3KQc-5iZDg64exWq5ZkGxQ'})
    })
    after(() => {
      (TaskModel.findOne as sinon.SinonStub).restore();
    })

    it('Should return string and succes status', async () => {
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.equal('admin');
    })
  })

  describe('Login validate invalid token response', async () => {
    before( async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set({authorization: '.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4ifQ.TAx2m1xFsWEGjDQPXyo2E3KQc-5iZDg64exWq5ZkGxQ'})
    })

    it('Should return message and invalid status', async () => {
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Expired or invalid token');
    })
  })

  describe('Login validate no token response', async () => {
    before( async () => {
      chaiHttpResponse = await chai.request(app)
      .get('/login/validate')
      .set({})
    })

    it('Should return message and invalid status', async () => {
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
    })
  })
});
