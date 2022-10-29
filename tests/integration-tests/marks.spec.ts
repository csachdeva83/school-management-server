import 'jest';
import express from 'express';
import request from 'supertest';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';

let token: string;

const marks = {
    studentId: 'ST001'
};

function filterMarks(obj: any){
    return {
        ...marks,
        ...obj
    };
};

describe('Marks Test Cases', () => {

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

    it('Marks', async () => {
        const response = await request(app).get('/marks/get').send().query(marks).set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Student marks for all exams and subjects');
    });

    it('Marks not present in db', async () => {

        const response = await request(app).get('/marks/get').send().query(filterMarks( {
            studentId: 'ST999'
        } )).set('x-access-token', token);
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No marks for given id.');
    });

    it('Performance percentage marks', async () => {
        const response = await request(app).get('/marks/performance-percentage').send().query(marks).set('x-access-token', token);
        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Student performance percentage for all exams');
    });

    it('Today Time Table not present in db', async () => {

        const response = await request(app).get('/marks/performance-percentage').send().query(filterMarks( {
            studentId: 'ST999'
        } )).set('x-access-token', token);
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No percentages available for given id.');

    });

    afterAll(async () => {
        destructDB();
    });


});