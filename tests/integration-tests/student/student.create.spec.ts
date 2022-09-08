import 'jest';
import express from 'express';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { destructDB, initializeDB } from '../../../src/configs/db.config';
import IntegrationHelpers from '../../helpers/Integration-helpers';
import CreateStudent from '../../../src/components/student/request/create-student.request';

const student: CreateStudent = {
     firstName : faker.name.firstName(),
     lastName : faker.name.lastName(),
     birthDate : '2005-03-06',
     phoneNumber : '+14084991635',
     email : faker.internet.email(),
     classId: '11D', 
     password: '11223344',
     passwordId: null
};

function filterStudent(obj: any) {
    return {
        ...student,
        ...obj
    };
};

describe('Create Operation for Student with Errors', () => {

    let app:express.Application;


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

    afterAll(async () => {        
        destructDB();
    });


});