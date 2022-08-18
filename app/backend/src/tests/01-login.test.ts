import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { describe, it, before } from 'mocha';

import { Response } from 'superagent';
import UserModel from '../database/models/UserModel'
import { app } from '../app';

import mockUser from './mocks/mocks'

chai.use(chaiHttp);

const { expect } = chai;


describe('1 - Testes para a rota /login', () => {
  before(async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(mockUser as unknown as UserModel);
  });

  it('Teste se a rota /login retorna status 200 e um objeto token ', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: "admin@admin.com", password: "secret_admin" })
    console.log(response.body);
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });
});