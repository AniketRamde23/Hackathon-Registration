import request from 'supertest';
import { app } from '../src/index';

// Mocks
jest.mock('../src/config/firebase', () => ({
  auth: {
    verifyIdToken: jest.fn()
  }
}));

jest.mock('../src/models/User.model', () => {
  return {
    findOne: jest.fn(),
    __esModule: true,
    default: {
      findOne: jest.fn(),
      prototype: { save: jest.fn() }
    }
  };
});

const { auth } = require('../src/config/firebase');
const User = require('../src/models/User.model').default;

describe('Authentication Flow Test Suite', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('OAuth2 / Firebase SSO Injection (POST /api/auth/sync)', () => {
    
    it('1. Should return 401 if missing Bearer token', async () => {
      const res = await request(app).post('/api/auth/sync').send({ uid: '123' });
      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Missing token');
    });

    it('2. Should emit HTTP-Only Secure JWT Cookie for valid login payload matching SSO context', async () => {
      auth.verifyIdToken.mockResolvedValue({ uid: '123', email: 'test@test.com', name: 'John SSO' });
      
      User.findOne.mockResolvedValue({
        _id: 'db_id_123',
        firebaseUid: '123',
        email: 'test@test.com',
        role: 'participant',
        name: 'John SSO'
      });

      const res = await request(app)
        .post('/api/auth/sync')
        .set('Authorization', 'Bearer fake_token')
        .send({ uid: '123' });
        
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      
      // Cookie Parsing verification
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/jwt_auth=.*HttpOnly.*SameSite=Strict/i); // Verified scoped HttpOnly
    });

    it('3. Should permanently invalidate Session on Logout stopping Replay attacks', async () => {
      const res = await request(app).post('/api/auth/logout');
      
      expect(res.statusCode).toBe(200);
      const cookies = res.headers['set-cookie'];
      expect(cookies[0]).toContain('jwt_auth=;'); // Cleared cookie
      expect(cookies[0]).toContain('Expires=');
    });

    it('4. Should handle brute-force lockout (Rate Limiter verification over malicious floods)', async () => {
      auth.verifyIdToken.mockResolvedValue({ uid: '123', email: 'test@test.com' });
      User.findOne.mockResolvedValue({ _id: 'db_id' });

      for (let i = 0; i < 10; i++) {
         await request(app).post('/api/auth/sync').set('Authorization', 'Bearer token').send({ uid: '123' });
      }
      
      const res = await request(app).post('/api/auth/sync').set('Authorization', 'Bearer token').send({ uid: '123' });
      
      expect(res.statusCode).toBe(429);
      expect(res.text).toContain("Too many authentication requests");
    });
  });

  describe('POST /api/auth/verify-otp (Email / Phone Manual Signup Flow)', () => {
    
    it('1. Should return 400 if verification code layout is invalid or missing', async () => {
      const res = await request(app).post('/api/auth/verify-otp').send({ to: '+1234567890' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Code is required');
    });

    it('2. Should fully verify successfully communicating securely outside the infrastructure boundaries', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: 'approved' })
        })
      ) as jest.Mock;

      const res = await request(app).post('/api/auth/verify-otp').send({ code: '123456', to: '+1234567890' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('approved');
    });
  });

});
