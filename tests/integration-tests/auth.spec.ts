import 'jest';
import express from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import IntegrationHelpers from '../helpers/Integration-helpers';
import AuthLogin from '../../src/components/auth/request/login.request';

const auth: AuthLogin = {
    schoolId: 1,
    userId: 'TR001',
    password: '11223344'
};

function filterAuth(obj: any) {
    return {
        ...auth,
        ...obj
    };
};

describe('Auth Test Cases', () => {

    let app: express.Application;


    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        initializeDB();

    });

    it('Auth student', async () => {
        const response = await request(app).post('/auth/login').send(filterAuth( {
            userId: 'ST004'
        } ));

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('User logged in successfully');
    });

    it('Auth teacher', async () => {
        const response = await request(app).post('/auth/login').send(auth);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('User logged in successfully');
    });

    it('Auth student id not in db', async () => {
        const response = await request(app).post('/auth/login').send(filterAuth( {
            userId: 'ST999'
        } ));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No student available for given id.');
    });

    it('Auth teacher id not in db', async () => {
        const response = await request(app).post('/auth/login').send(filterAuth( {
            userId: 'TR999'
        } ));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No teacher available for given id.');
    });

    it('Auth without school id', async () => {
        const response = await request(app).post('/auth/login').send(filterAuth({ schoolId: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Auth without user id', async () => {
        const response = await request(app).post('/auth/login').send(filterAuth({ userId: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Auth without password', async () => {
        const response = await request(app).post('/auth/login').send(filterAuth({ password: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    afterAll(async () => {
        destructDB();
    });


});