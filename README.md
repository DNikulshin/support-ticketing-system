# Support Ticketing System

Система управления заявками (тикетами) с ролевой моделью (Admin/User).

**Стек:** NestJS (сервер), React 19 (клиент), Prisma (SQLite), JWT.

## Возможности
- Регистрация/аутентификация (JWT)
- Создание, редактирование, удаление тикетов
- Назначение исполнителей, приоритеты, статусы
- Комментарии (внутренние/внешние)
- Загрузка вложений (изображения, документы)
- Панель администратора (управление пользователями, роли)
- Swagger-документация API

## Быстрый старт

### Backend
```bash
cd server
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev   # http://localhost:3001
Frontend
bash
cd client
npm install
npm run dev         # http://localhost:5173
Тестовые аккаунты
Admin: admin@crm.com / admin123

User: user@crm.com / user123

API Docs
Swagger UI: http://localhost:3001/api/docs