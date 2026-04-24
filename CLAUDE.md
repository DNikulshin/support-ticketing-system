# support-ticketing-system — AI Rules

## Architecture
support-ticketing-system/
├── server/ # NestJS backend
│ ├── src/
│ │ ├── auth/ # JWT, Guards, Roles
│ │ ├── users/ # CRUD User
│ │ ├── tickets/ # CRUD Ticket, Comments, Attachments
│ │ └── prisma/ # Prisma service
│ ├── prisma/ # Schema, migrations, seed
│ └── uploads/ # Загруженные файлы
└── client/ # React frontend
├── src/
│ ├── components/ui/ # shadcn/ui компоненты
│ ├── contexts/ # AuthContext
│ ├── pages/ # Dashboard, Tickets, Users, Profile
│ └── services/api.ts # Axios + interceptors
└── public/

text

## Key Decisions
- **Сервер**: NestJS с модульной структурой, валидация через class-validator, Swagger.
- **Клиент**: Vite, React 19, React Query, shadcn/ui (Tailwind).
- **Аутентификация**: JWT access + refresh (пока только access). Токен хранится в localStorage.
- **Роли**: `ADMIN` – полный доступ, `USER` – только свои тикеты.
- **БД**: SQLite (Prisma), для продакшена заменить на PostgreSQL.

## Coding Conventions
- API endpoints: `/api/auth/*`, `/api/users/*`, `/api/tickets/*`
- Все запросы требуют `Authorization: Bearer <jwt>` (кроме login/register)
- Ответы оборачиваются в `ApiResponse<T>` или `PaginatedResponse<T>`
- Компоненты используют `cn()` утилиту для классов

## Testing
Отсутствует. Приоритет: добавить e2e тесты для критичных сценариев (логин, создание тикета).