import 'jest';
import express from 'express';
import request from 'supertest';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';

let token: string;

describe('Syllabus Test Cases', () => {

    let app: express.Application;

    const syllabus = {
        classId: '10A'
    };

    function filterSyllabus(obj: any){
        return {
            ...syllabus,
            ...obj
        };
    };

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

    it('Syllabus', async () => {
        const response = await request(app).get('/syllabus/get').send().query(syllabus).set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Syllabus fetched successfully');
    });

    it('Syllabus not present in db', async () => {

        const response = await request(app).get('/syllabus/get').send().query(filterSyllabus( {
            classId: '1C'
        } )).set('x-access-token', token);
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No syllabus for given id.');
    });

    afterAll(async () => {
        destructDB();
    });


});