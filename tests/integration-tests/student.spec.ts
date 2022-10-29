import 'jest';
import express from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import CreateStudent from '../../src/components/student/request/create-student.request';
import IntegrationHelpers from '../helpers/Integration-helpers';

const student: CreateStudent = {
    id: null,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: '2005-03-06',
    phoneNumber: '+14084991635',
    email: faker.internet.email(),
    classId: '10A',
    password: '11223344',
    passwordId: null,
    imageLink: 'https://cdn4.iconfinder.com/data/icons/professions-bzzricon-flat/512/25_Student-512.png',
    schoolId: 1

};

function filterStudent(obj: any) {
    return {
        ...student,
        ...obj
    };
};

describe('Student Test Cases', () => {

    let app: express.Application;


    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        initializeDB();
    });

    it('Create Student', async () => {
        const response = await request(app).post('/student/create').send(student);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.data.firstName).toEqual(student.firstName);
        expect(response.body.data.lastName).toEqual(student.lastName);
        expect(response.body.data.birthDate).toEqual(student.birthDate);
        expect(response.body.data.email).toEqual(student.email);
        expect(response.body.data.phoneNumber).toEqual(student.phoneNumber);
        expect(response.body.data.classId).toEqual(student.classId);
        expect(response.body.message).toEqual('Student created successfully');
    });

    it('Create Student without first name', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ firstName: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without last name', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ lastName: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without birth date', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ birthDate: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without phone number', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ phoneNumber: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without email', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ email: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without class id', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ classId: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without password', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ password: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Student without image link', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ 
            imageLink: undefined,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(), 
            email: faker.internet.email()
        }));

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Student created successfully');
    });

    it('Create Student without school id', async () => {
        const response = await request(app).post('/student/create').send(filterStudent({ schoolId: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Get Student', async () => {
        const response = await request(app).get('/student/get').query({ studentId: 'ST004' }).send();

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Get student successfully');
    });

    it('Get Student for student id not in db', async () => {
        const response = await request(app).get('/student/get').query({ studentId: 'ST999' }).send();

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No student available for given id.');
    });

    afterAll(async () => {
        destructDB();
    });


});