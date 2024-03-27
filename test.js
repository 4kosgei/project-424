// test.js

const request = require('supertest');
const app = require('../app'); // Import your Express application

describe('GET /vr-content', () => {
  it('responds with JSON containing the VR content', (done) => {
    request(app)
      .get('/vr-content')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here to check the response body
        done();
      });
  });
});
