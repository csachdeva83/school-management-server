import 'jest';
import express from 'express';
import request from 'supertest';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';

let token: string;

const timeTable = {
    classId: '10A'
};

function filterTimetable(obj: any){
    return {
        ...timeTable,
        ...obj
    };
};

describe('Time Table Test Cases', () => {

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

    it('Time Table', async () => {
        const response = await request(app).get('/time-table/get').send().query(timeTable).set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Time Table fetched successfully');
    });

    it('Time Table not present in db', async () => {

        const response = await request(app).get('/time-table/get').send().query(filterTimetable( {
            classId: '1C'
        } )).set('x-access-token', token);
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No time table for given id.');
    });

    it('Today Time Table', async () => {
        const response = await request(app).get('/time-table/get-today').send().query(timeTable).set('x-access-token', token);
        if(new Date().getDay() === 0 || new Date().getDay() === 6){
            expect(response.body.status).toEqual('ERROR');
            expect(response.body.statusCode).toEqual(417);
            expect(response.body.message).toEqual('No time table for given id.');
        }else{
            expect(response.body.statusCode).toEqual(200);
            expect(response.body.status).toEqual('SUCCESS');
            expect(response.body.message).toEqual('Time Table fetched successfully');
        }
    });

    it('Today Time Table not present in db', async () => {

        const response = await request(app).get('/time-table/get-today').send().query(filterTimetable( {
            classId: '1C'
        } )).set('x-access-token', token);
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No time table for given id.');
        expect(response.body.message === 'No time table for given id.' 
        || response.body.message === 'No subject teacher mapping for given id.'
        ).toBe(true);

    });

    afterAll(async () => {
        destructDB();
    });


});