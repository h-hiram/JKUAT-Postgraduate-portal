const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcryptjs');

describe('Auth API', () => {
  /*it('should return 401 for invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'fake@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });*/

  //valid login test
  it('should return 200 and a token for valid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'admin@example.com');
  });

  it('should return 401 for correct email and invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});

bcrypt.hash('admin123', 10).then(console.log);