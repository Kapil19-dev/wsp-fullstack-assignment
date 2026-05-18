# DECISIONS.md

# Architecture Decisions

The application was designed as a modular full stack web application using:

- Django REST Framework for backend APIs
- React.js for frontend UI
- PostgreSQL as the relational database
- Docker for containerization

The primary goal was to build a clean, maintainable, and scalable solution within the assignment scope.

---

# Backend Design Decisions

The Django backend was split into separate apps:

```text
projects/
kpis/
```

This separation improves:
- maintainability
- readability
- feature isolation
- scalability

Each app manages:
- models
- serializers
- views
- business logic

The backend exposes REST APIs consumed by the frontend.

---

# Frontend Design Decisions

The frontend was implemented using:
- React.js
- Vite
- Axios

The frontend communicates with backend APIs using Axios service calls.

The UI was intentionally kept simple and dashboard-oriented to prioritize:
- clarity
- usability
- assignment delivery speed

over advanced UI complexity.

---

# KPI Design Approach

KPIs were intentionally modeled as flexible entities instead of hardcoded types.

Example of avoided design:

```text
RevenueKPI
QualityKPI
DeliveryKPI
```

Instead, a generic KPI schema was implemented:

```text
KPI
- name
- target_value
- actual_value
- status
```

This provides:
- better scalability
- easier future extension
- support for multiple KPI types
- simpler architecture

This decision aligns with the assignment requirement that KPIs should not be hardcoded into application logic.

---

# Database Design Decisions

PostgreSQL was selected because:
- it is production-grade
- supports relational modeling well
- integrates easily with Django
- is commonly used in enterprise environments

Relationships:
- One Project can have multiple KPIs
- KPIs belong to a single Project

---

# KPI Summary Logic

The KPI summary endpoint calculates:
- total KPIs
- ON_TRACK KPIs
- AT_RISK KPIs
- OFF_TRACK KPIs

Overall status logic:

- OFF_TRACK if any KPI is OFF_TRACK
- AT_RISK if no OFF_TRACK exists but at least one KPI is AT_RISK
- ON_TRACK otherwise

The logic was intentionally kept simple for assignment scope.

---

# Dockerization Decisions

Docker Compose was used to simplify:
- local setup
- database setup
- dependency consistency
- reviewer execution experience

This allows the project to run with minimal setup commands.

---

# Scalability Considerations

Although intentionally simple, the architecture supports future scaling.

## Backend
- modular Django apps
- REST API architecture
- PostgreSQL relational design

## Frontend
- component-based architecture
- centralized API layer

## Infrastructure
- Dockerized environment
- environment variable configuration

---

# Trade-offs

The assignment was completed within limited time, so several trade-offs were made.

## Included
- Full stack integration
- KPI dashboard
- PostgreSQL integration
- Docker support
- API architecture
- Documentation

## Excluded
- Authentication
- Role-based access
- Automated tests
- CI/CD pipeline
- KPI editing/deletion
- Advanced analytics

---

# Authentication

Authentication was intentionally excluded due to assignment scope and time constraints.

A production-ready system would include:
- JWT authentication
- user management
- role-based authorization

Potential roles:
- Admin
- Project Owner
- Viewer

---

# Assumptions

- Single-user environment
- Trusted internal users
- KPI status manually selected
- Local Docker execution environment

---

# Future Improvements

Potential future enhancements include:

- JWT Authentication
- KPI edit/delete support
- KPI history tracking
- Charts and analytics
- Search and filtering
- Pagination
- Automated testing
- CI/CD pipeline
- Cloud deployment
- Kubernetes support

---

# Conclusion

The solution was designed to balance:
- simplicity
- maintainability
- scalability
- delivery speed

while meeting the core assignment requirements.