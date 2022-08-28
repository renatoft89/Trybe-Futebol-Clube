import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { describe, it, before } from 'mocha';

import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel'
import { app } from '../app';

import { mockTeam } from './mocks/mocks'

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes para a rota /teams', () => {
  before(async () => {
    return sinon
      .stub(TeamModel, 'findAll')
      .resolves(mockTeam as unknown as TeamModel[]);
  });

  it('1 - Teste se a rota /teams retorna todos os times ', async () => {
    const response = await chai
      .request(app)
      .get('/teams')
    
    expect(response.status).to.be.equal(200);
    expect(response.body.length).to.equal(3);
  });

  it('2 - Teste se a rota /teams/:id retorna status 200 e teamName São Paulo ', async () => {
    const response = await chai
      .request(app)
      .get('/teams/16')

    expect(response.status).to.be.equal(200);
    expect(response.body[0].teamName).to.be.equal('São Paulo');
  });
});