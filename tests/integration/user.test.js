import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
import { response } from 'express';

let userToken;
let _id;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /registration', () => {
    it('given new user when added should return status 201', (done) => {
      const registrationDetails = {
            firstName : "Rashmi",
            lastName : "Gajra",
            email : "naner67306@arpizol.com",
            password : "Hanish@12345"
           };
      request(app)
        .post('/api/v1/users/register')
        .send(registrationDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  describe('POST/login', () => {
    it('given login user when logged in should return status 201', (done) => {
      const loginDetails = {
        email : "naner67306@arpizol.com",
        password : "Hanish@12345"
       };

      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          userToken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  // describe(`POST/forget`, () => {
  //     it('given mail id we forget password of when logged in should return status 201', (done) => {
  //       const forgottenMail = {
  //         email : "naner67306@arpizol.com",
  //       };

  //       request(app)
  //         .post('/api/v1/users/forget')
  //         .send(forgottenMail)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(HttpStatus.OK);
  //           done();
  //         });
  //     });
  // });

  // describe('PUT/reset', () => {
  //     it('given mail id for reset password of when logged in should return status 201', (done) => {
  //       const resetMail = {
  //         password : "Mahlove@2021"

  //       };
  //       const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmVyNjczMDZAYXJwaXpvbC5jb20iLCJpZCI6IjYyNWVhNDliN2IzZmNiM2VkMDY2ZDZmNSIsImlhdCI6MTY1MDM2OTc3Nn0.LYsutz_PqgGFQLKZp862Yi6fxJmex8vkq2-9Wo2gtV8"

  //       request(app)
  //         .put('/api/v1/users/reset')
  //         .set('token',`${jwtToken}`)
  //         .send(resetMail)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(HttpStatus.OK);
  //           done();
  //         });
  //     });
  // });

  describe('create Note', () => {
    it('given new note when added should return status 201', (done) => {
      const createNote = {
        Title : "Title",
        Descreption : "Descreption",
        color : "red" 
      };
      // let bearerToken = userToken;
      // console.log(userToken);
      request(app)
        .post('/api/v1/notes/create')
        .set('token', `${userToken}`)
        .send(createNote)
        .end((err, res) => {
          _id = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  describe('get All Notes', () => {
    it('given token get all notes should return status 201', (done) => {
      
      // let bearerToken = userToken;
      // console.log(userToken);
      request(app)
        .get('/api/v1/notes/all')
        .set('token', `${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('Get note by ID', () => {
    it('given token get note by ID should return status 201', (done) => {
      request(app)
        .get(`/api/v1/notes/${_id}`)
        .set('token', `${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('update note by ID', () => {
    it('given token update note by ID should return status 201', (done) => {
        const updateNote = {
            Title : "Title1",
            Descreption : "Descreption1",
            color : "pink" 
          };
      request(app)
        .put(`/api/v1/notes/${_id}`)
        .set('token', `${userToken}`)
        .send(updateNote)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });
  });

  describe('Archive note by ID', () => {
    it('given token archive note by ID should return status 201', (done) => {
    
      request(app)
        .put(`/api/v1/notes/archive/${_id}`)
        .set('token', `${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('trash note by ID', () => {
    it('given token trash note by ID should return status 201', (done) => {
    
      request(app)
        .put(`/api/v1/notes/trash/${_id}`)
        .set('token', `${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('Delete note by ID', () => {
    it('given token delete note by ID should return status 201', (done) => {
    
      request(app)
        .delete(`/api/v1/notes/${_id}`)
        .set('token', `${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

});
