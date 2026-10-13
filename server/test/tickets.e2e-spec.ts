import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth & Tickets Security (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Security and Guard Enforcement', () => {
    it('/tickets (GET) - rejects unauthorized request with 401', async () => {
      await request(app.getHttpServer())
        .get('/tickets')
        .expect(401);
    });

    it('/tickets (POST) - rejects unauthorized ticket creation with 401', async () => {
      await request(app.getHttpServer())
        .post('/tickets')
        .send({
          title: 'Unauthorized Test Ticket',
          description: 'Testing security guards',
        })
        .expect(401);
    });

    it('/auth/login (POST) - rejects invalid credentials with 401', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'unknown_fake_user@example.com',
          password: 'BadPassword123!',
        })
        .expect(401);
    });
  });
});
