import 'jest';
import express from 'express';
import request from 'supertest';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';

let token: string;

describe('Circular Test Cases', () => {

    let app: express.Application;


    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        initializeDB();

        const authResponse = await request(app).post('/auth/login').send({
            schoolId: 1,
            userId: 'ST001',
            password: '11223344'
        });

        token = authResponse.body.data.token;

    });

    it('Circular', async () => {
        const response = await request(app).get('/circular/get').send().set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Circulars fetched successfully');
    });

    it('Circular not present in db', async () => {
        const response = await request(app).get('/circular/get').send().set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJTVDAwMSIsInNjaG9vbElkIjoxMDEsImlhdCI6MTY2NzA0Mzk1NiwiZXhwIjoxNjY3NjQ4NzU2fQ.OSmYB2LoBtLwlo5XlWoQLo6S1hwWdcgzH6knW-j5bso');
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No circulars for given id.');
    });

    afterAll(async () => {
        destructDB();
    });


});