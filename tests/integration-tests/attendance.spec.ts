import 'jest';
import express from 'express';
import request from 'supertest';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';

const attendance = {
    studentId: 'ST001'
};

function filterAttendance(obj: any) {
    return {
        ...attendance,
        ...obj
    };
};

let token: string;

describe('Attendance Test Cases', () => {

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

    it('Attendance', async () => {
        const response = await request(app).get('/attendance/get').query(attendance).send().set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Attendance fetched successfully');
    });

    it('Attendance not present in db', async () => {
        const response = await request(app).get('/attendance/get').query(
            filterAttendance( {
            studentId: 'ST999'
        } ) 
        ).send().set('x-access-token', token);
        
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No count for given id.');
    });

    afterAll(async () => {
        destructDB();
    });


});