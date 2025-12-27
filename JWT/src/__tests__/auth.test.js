import dotenv from 'dotenv';
dotenv.config();

import request from 'supertest';
import { app } from '../../index.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';

beforeAll(async () => {
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_db';
    await mongoose.connect(mongoUri);
});

afterEach(async () => {
    
    await User.deleteMany({});
});

afterAll(async () => {
    
    await mongoose.disconnect();
});


describe('Authentication Endpoints', () => {
    const testUser = {
        email: 'test@example.com',
        password: 'password123',
    };

    
    it('should sign up a new user successfully', async () => {
        const res = await request(app)
            .post('/signup')
            .send(testUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('email', testUser.email);
    });

    
    it('should not sign up a user with an existing email', async () => {
        
        await request(app).post('/signup').send(testUser);

        
        const res = await request(app)
            .post('/signup')
            .send(testUser);

        expect(res.statusCode).toEqual(409);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('User with this email already exists');
    });

    
    it('should log in an existing user successfully', async () => {
        
        await request(app).post('/signup').send(testUser);

        
        const res = await request(app)
            .post('/login')
            .send(testUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('accessToken');
        expect(res.body.data.user).toHaveProperty('email', testUser.email);
        
        expect(res.headers['set-cookie'][0]).toContain('refreshToken');
    });

    
    it('should not log in with incorrect password', async () => {
        
        await request(app).post('/signup').send(testUser);

        
        const res = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: 'wrongpassword' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid credentials');
    });

    
    it('should not allow access to profile without a token', async () => {
        const res = await request(app).get('/profile');
        expect(res.statusCode).toEqual(401);
    });

    
    it('should allow access to profile with a valid token', async () => {
        
        await request(app).post('/signup').send(testUser);
        const loginRes = await request(app).post('/login').send(testUser);
        const token = loginRes.body.data.accessToken;

        const res = await request(app)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('email', testUser.email);
    });
});
