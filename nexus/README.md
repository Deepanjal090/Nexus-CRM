# NEXUS Business Platform

NEXUS is a highly-scalable, self-hosted, all-in-one business workspace. Designed as a modern alternative to platforms like Bitrix24, it seamlessly integrates CRM, Task Management, Team Collaboration, and Employee Management into a single, cohesive interface.

![NEXUS UI Showcase](https://via.placeholder.com/1200x600/2563eb/ffffff?text=NEXUS+Business+Platform)

## 🌟 Key Features

### **CRM (Customer Relationship Management)**
- **Leads Pipeline:** Capture, qualify, and convert leads with a drag-and-drop Kanban interface.
- **Deals & Pipelines:** Manage sales cycles, customize pipeline stages, and track deal values.
- **Contacts & Companies:** Unified directory with deep history tracking of all interactions.
- **Data Portability:** Robust Excel/CSV import and export utilities with template support.

### **Tasks & Projects**
- **Task Management:** Cross-functional task delegation with multiple views (Kanban, List, Gantt, Calendar).
- **Projects:** Organize workstreams with granular progress tracking, sprint cycles, and milestone management.
- **Role-Based Access:** Differential views for Supervisors (team overviews) and Employees (personal task prioritization).

### **Platform Capabilities**
- **Real-Time Engine:** Built-in WebSocket infrastructure for live chat and instantaneous notifications.
- **Dynamic Theming:** A polished, "Bright Professional" UI optimized for readability and extended use.
- **Zero-Dependency Local Dev:** Capable of running locally via SQLite for rapid development and demonstration, with seamless production scaling to PostgreSQL.

---

## 🏗 Architecture & File Segregation

The project utilizes a strict **Monorepo Architecture** managed by TurboRepo. This segregates concerns, ensures code reusability, and maintains a highly professional developer experience.

```text
nexus/
├── apps/
│   ├── api/                 # Backend: NestJS (Controllers, Services, WebSockets)
│   └── web/                 # Frontend: React 19, Vite, Tailwind v4, RTK Query
├── packages/                # Segregated Shared Libraries
│   ├── constants/           # Shared ENUMs and configuration constants
│   ├── types/               # Shared TypeScript interfaces and DTOs
│   └── validators/          # Shared Zod validation schemas
├── prisma/                  # Database schema, migrations, and seeding scripts
├── infra/                   # Infrastructure configuration (Docker Compose, NGINX)
└── package.json             # Root workspace definitions and Turbo scripts
```

### Tech Stack
- **Frontend:** React 19, TypeScript, Vite, TailwindCSS v4, Redux Toolkit, RTK Query, Framer Motion.
- **Backend:** NestJS 11, Prisma ORM, Socket.io.
- **Database:** SQLite (Development) / PostgreSQL (Production).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.0.0 or higher)
- npm (v10.8.0 or higher)

### 1. Installation
Clone the repository and install all workspace dependencies:
```bash
git clone <repository-url>
cd nexus
npm install
```

### 2. Database Initialization
Initialize the database and populate it with the default workspace and test data:
```bash
# Push the schema to the local SQLite database
npx prisma db push

# Seed the database with the default Admin user and Pipelines
npm run db:seed
```
*Note: The default admin credentials are `sood@nexus.local` / `password123`.*

### 3. Running the Application
Start the entire monorepo (both Frontend and Backend) using TurboRepo:
```bash
npm run dev
```

- **Frontend Application:** Available at `http://localhost:3000`
- **Backend API:** Available at `http://localhost:3001/api/v1`

---

## 🛡 Security & Authentication
Authentication is fully integrated using a robust JWT strategy. 
- The `api` utilizes NestJS Guards (`@UseGuards(JwtAuthGuard)`) to protect endpoints.
- The `web` client utilizes Redux Toolkit and RTK Query interceptors to securely attach Bearer tokens to all outbound requests.
- Passwords are securely hashed using `bcryptjs`.

---

## 📦 Deployment (Production)

To deploy the application in a production environment, use the provided Docker infrastructure:
```bash
docker compose -f infra/docker-compose.yml up -d
```
Ensure that you update the `provider` in `prisma/schema.prisma` from `sqlite` back to `postgresql` and provide a valid `DATABASE_URL` in your `.env` file before executing the containerized deployment.

---
*Built with 💻 by the NEXUS Engineering Team.*
