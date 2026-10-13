# Support Desk (Helpdesk & CRM System)

[![CI & Tests](https://github.com/DNikulshin/support-ticketing-system/actions/workflows/ci.yml/badge.svg)](https://github.com/DNikulshin/support-ticketing-system/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red.svg)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-teal.svg)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

Полнофункциональная корпоративная Helpdesk & CRM-система для обработки обращений клиентов и сервисных заявок с ролевой моделью доступа (RBAC), автогенерацией Swagger-спецификации, оффлайн-уведомлениями и полным покрытием автоматическими тестами.

---

## 🏗 Архитектура и стек технологий

### Backend (`/server`)
- **Framework:** NestJS 11 (модульная архитектура, Dependency Injection, Guards, Interceptors)
- **Database & ORM:** Prisma ORM, PostgreSQL / SQLite с миграциями схем
- **Security & Auth:** JWT (JSON Web Tokens), `bcryptjs`, Guards для RBAC (`ADMIN` / `USER`)
- **API & Validation:** REST API, DTO с валидацией через `class-validator`, автогенерируемый Swagger (OpenAPI 3.0)
- **Testing:** Unit-тестирование сервисов на **Jest**, сквозные e2e-тесты на **Supertest**

### Frontend (`/client`)
- **Framework:** React 19 + TypeScript + Vite
- **UI & Styling:** Tailwind CSS + Radix UI (shadcn-like модули)
- **State & Data Fetching:** React Hooks, Axios с интерцепторами авторизации
- **UX:** Оптимистичные обновления, интерактивные фильтры статусов, загрузка вложений

### DevOps & Infrastructure
- **Containerization:** Многоэтапные сборки `Dockerfile` (мультистейдж для минимизации размера образов)
- **Orchestration:** `docker-compose.yml` (изолированные сервисы бэкенда и фронтенда с healthchecks)
- **CI/CD:** GitHub Actions (автоматический запуск Unit и E2E тестов при каждом пуше и Pull Request)

---

## 🚀 Быстрый старт через Docker (1 команда)

```bash
docker compose up --build -d
```
- **Web App (Client):** http://localhost:5173
- **Backend API:** http://localhost:3001
- **Swagger UI:** http://localhost:3001/api/docs

---

## 🧪 Запуск автоматических тестов

В проекте настроены unit и e2e тесты для проверки бизнес-логики и защиты эндпоинтов:

```bash
cd server

# Запуск юнит-тестов (AuthService, TicketsService)
npm run test

# Запуск сквозных E2E тестов безопасности и ролевого доступа
npm run test:e2e

# Отчет о покрытии кода (Coverage)
npm run test:cov
```

---

## 🔑 Тестовые аккаунты

| Роль | Email | Пароль | Права |
|---|---|---|---|
| **Admin** | `admin@crm.com` | `admin123` | Полный доступ ко всем заявкам, назначение исполнителей, админ-панель |
| **User** | `user@crm.com` | `user123` | Создание заявок, просмотр только своих тикетов, внешние комментарии |

---

## 📂 Структура репозитория

```
├── .github/workflows/
│   └── ci.yml             # GitHub Actions CI: сборка, линтинг и прогон тестов
├── client/                # React 19 SPA клиент
├── server/                # NestJS API бэкенд
│   ├── src/
│   │   ├── auth/          # Модуль авторизации (JWT, guards, DTO, unit-тесты)
│   │   ├── tickets/       # Модуль тикетов (CRUD, RBAC, вложения, unit-тесты)
│   │   ├── users/         # Модуль пользователей
│   │   └── prisma/        # Схема базы данных и сиды
│   └── test/              # E2E-тесты (Supertest)
├── docker-compose.yml     # Оркестрация контейнеров
└── README.md
```

## 👨‍💻 Автор
**Дмитрий Никульшин**  
- Telegram: [@nikulshin_dev](https://t.me/nikulshin_dev)
- DevLog: [@dnikulshin_devlog](https://t.me/dnikulshin_devlog)
- GitHub: [github.com/DNikulshin](https://github.com/DNikulshin)
