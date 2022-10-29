import 'jest';
import express from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { destructDB, initializeDB } from '../../src/configs/db.config';
import CreateTeacher from '../../src/components/teacher/request/create-teacher.request';
import IntegrationHelpers from '../helpers/Integration-helpers';

const teacher: CreateTeacher = {
    id: null,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: '2005-03-06',
    phoneNumber: '+14084991635',
    email: faker.internet.email(),
    subjectName: 'Hindi', 
    password: '11223344',
    passwordId: null,
    imageLink: 'https://cdn4.iconfinder.com/data/icons/professions-bzzricon-flat/512/25_Student-512.png',
    schoolId: 1,
    subjectIds: [36]

};

function filterTeacher(obj: any) {
    return {
        ...teacher,
        ...obj
    };
};

describe('Teacher Test Cases', () => {

    let app: express.Application;


    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
        initializeDB();
    });

    it('Create Teacher', async () => {
        const response = await request(app).post('/teacher/create').send(teacher);

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.data.firstName).toEqual(teacher.firstName);
        expect(response.body.data.lastName).toEqual(teacher.lastName);
        expect(response.body.data.birthDate).toEqual(teacher.birthDate);
        expect(response.body.data.email).toEqual(teacher.email);
        expect(response.body.data.phoneNumber).toEqual(teacher.phoneNumber);
        expect(response.body.data.subjectName).toEqual(teacher.subjectName);
        expect(response.body.message).toEqual('Teacher created successfully');
    });

    it('Create Teacher without first name', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ firstName: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without last name', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ lastName: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without birth date', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ birthDate: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without phone number', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ phoneNumber: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without email', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ email: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without subject name', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ subjectName: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without password', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ password: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without image link', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ 
            imageLink: undefined,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(), 
            email: faker.internet.email()
        }));

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Teacher created successfully');
    });

    it('Create Teacher without school id', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ schoolId: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Create Teacher without subject ids', async () => {
        const response = await request(app).post('/teacher/create').send(filterTeacher({ subjectIds: undefined }));

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(400);
        expect(response.body.message).toEqual('Model validation failed');
    });

    it('Get Teacher', async () => {
        const response = await request(app).get('/teacher/get').query({ teacherId: 'TR001' }).send();

        expect(response.body.status).toEqual('SUCCESS');
        expect(response.body.statusCode).toEqual(200);
        expect(response.body.message).toEqual('Get teacher successfully');
    });

    it('Get Teacher for teacher id not in db', async () => {
        const response = await request(app).get('/teacher/get').query({ teacherId: 'TR999' }).send();

        expect(response.body.status).toEqual('ERROR');
        expect(response.body.statusCode).toEqual(417);
        expect(response.body.message).toEqual('No teacher available for given id.');
    });

    afterAll(async () => {
        destructDB();
    });


});