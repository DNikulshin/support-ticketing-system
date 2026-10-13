import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Auth & Tickets Security (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

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
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication Security', () => {
    it('/api/tickets (GET) - should reject unauthorized requests with 401 Unauthorized', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/tickets')
        .expect(401);

      expect(response.body).toHaveProperty('message');
    });

    it('/api/tickets (POST) - should reject ticket creation without Bearer token with 401', async () => {
      await request(app.getHttpServer())
        .post('/api/tickets')
        .send({
          title: 'Unauthorized Ticket',
          description: 'Should not be allowed',
        })
        .expect(401);
    });

    it('/api/auth/login (POST) - should reject invalid credentials with 401', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'nonexistent_test_account@crm.com',
          password: 'WrongPassword123!',
        })
        .expect(401);
    });
  });
});
