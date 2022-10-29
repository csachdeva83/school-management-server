import 'jest';
import express from 'express';
import request from 'supertest';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';

const assignment = {
    studentId: 'ST001',
    classId: undefined
};

function filterAssignment(obj: any) {
    return {
        ...assignment,
        ...obj
    };
};

let token: string;

describe('Assignment Test Cases', () => {

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

    it('Upcoming assignments', async () => {
        const response = await request(app).get('/assignment/upcoming').query(filterAssignment( {
            classId: '10A'
        } )).send().set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Upcoming assignments fetched successfully');
    });

    it('Upcoming assignments not present in db', async () => {
        const response = await request(app).get('/assignment/upcoming').query(
            filterAssignment( {
            classId: '1C'
        } ) 
        ).send().set('x-access-token', token);

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No upcoming assignments with given id.');
    });

    it('Pending assignments', async () => {
        const response = await request(app).get('/assignment/pending').query(assignment).send().set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Pending assignments fetched successfully');
    });

    it('Pending assignments not present in db', async () => {
        const response = await request(app).get('/assignment/pending').query(filterAssignment( {
            studentId: 'ST999'
        } )).send().set('x-access-token', token);
        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No pending assignments with given id.');
    });

    it('Submitted assignments', async () => {
        const response = await request(app).get('/assignment/submitted').query(assignment).send().set('x-access-token', token);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Submitted assignments fetched successfully');
    });

    it('Submitted assignments not present in db', async () => {
        const response = await request(app).get('/assignment/submitted').query(filterAssignment( {
            studentId: 'ST999'
        } )).send().set('x-access-token', token);

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No submitted assignments with given id.');
    });

    afterAll(async () => {
        destructDB();
    });


});