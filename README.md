# WSP Full Stack Assignment

A full stack KPI management dashboard built using:

- Django REST Framework
- React.js
- PostgreSQL
- Docker

---

# Features

## Project Management
- Create projects
- View project list

## KPI Management
- Add KPIs to projects
- Track KPI target and actual values
- Track KPI status

## KPI Summary Dashboard
- Total KPIs
- ON_TRACK KPIs
- AT_RISK KPIs
- OFF_TRACK KPIs

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- PostgreSQL

## Frontend
- React.js
- Vite
- Axios
- Tailwind CSS

## Infrastructure
- Docker
- Docker Compose

---

# Project Structure

```text
wsp_fullstack/
│
├── core/
├── projects/
├── kpis/
├── frontend/
├── manage.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── README.md
└── DECISIONS.md
```

---

# Backend Setup

## Run Backend

From project root:

```bash
docker compose up --build
```

Backend runs on:

```text
http://localhost:8000
```

---

# Frontend Setup

Open a new terminal.

Go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# API Endpoints

## Projects

### Get Projects

```http
GET /api/projects/
```

### Create Project

```http
POST /api/projects/
```

---

## KPIs

### Create KPI

```http
POST /api/kpis/
```

### Get KPI Summary

```http
GET /api/kpis/summary/
```

---

# KPI Status Values

Supported statuses:

- ON_TRACK
- AT_RISK
- OFF_TRACK

---

# Screenshots

## Dashboard

![Dashboard](./screenshots/dashboard.png)

---

# Deployment

## Backend

Recommended deployment platforms:
- Render
- Railway
- Fly.io

Recommended production start command:

```bash
gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
```

---

## Frontend

Recommended deployment platforms:
- Vercel
- Netlify

Before deployment update frontend API base URL.

---

# Documentation

Additional architecture and design decisions are documented in:

```text
DECISIONS.md
```

---

# Assumptions

- Single user environment
- KPI statuses are manually selected
- Authentication excluded due to assignment scope

---

# Future Improvements

- JWT Authentication
- Role-based access control
- KPI edit/delete
- Charts and analytics
- Pagination and filtering
- CI/CD pipeline
- Cloud deployment

---

# Author

Kapil Singh Rathore