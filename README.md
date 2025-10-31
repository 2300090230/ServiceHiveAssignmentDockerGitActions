# SlotSwapper — Fullstack Project

## Project Overview
SlotSwapper is a peer-to-peer time-slot scheduling and swapping application. Users can create calendar events (time slots), mark them as swappable, request swaps with other users’ swappable slots, and accept or reject swap requests. The backend is built with Spring Boot + MongoDB and secured using Spring Security + JWT. The frontend is built with React (Vite) and Tailwind CSS.

**Tech stack**
- Backend: Spring Boot, Java 21, Spring Security, JWT, Spring Data MongoDB
- Frontend: React (Vite), Tailwind CSS, React Router, Axios
- Database: MongoDB Atlas
- DevOps / Deployment: Docker, Docker Compose, GitHub Actions, Docker Hub, Vercel (frontend), Render.com (backend)

---

## Repository Structure (high-level)

### Backend (`SlotSwapperBackend`)
```
SlotSwapperBackend
└── src
    ├── main
    │   ├── java
    │   │   └── com.servicehive.slotswapper
    │   │       ├── SlotSwapperBackendApplication.java
    │   │       ├── config
    │   │       │   ├── JwtAuthenticationFilter.java
    │   │       │   ├── JwtUtil.java
    │   │       │   ├── PasswordEncoderConfig.java
    │   │       │   └── SecurityConfig.java
    │   │       ├── controller
    │   │       │   ├── AuthController.java
    │   │       │   ├── EventController.java
    │   │       │   ├── GlobalExceptionHandler.java
    │   │       │   ├── SwapController.java
    │   │       │   └── TestController.java
    │   │       ├── dto
    │   │       │   ├── AuthResponse.java
    │   │       │   ├── EventRequest.java
    │   │       │   ├── EventResponse.java
    │   │       │   ├── LoginRequest.java
    │   │       │   ├── SignUpRequest.java
    │   │       │   ├── SwapRequestDTO.java
    │   │       │   ├── SwapRequestResponse.java
    │   │       │   ├── SwapResponseDTO.java
    │   │       │   └── UpdateEventStatusRequest.java
    │   │       ├── model
    │   │       │   ├── Event.java
    │   │       │   ├── EventStatus.java
    │   │       │   ├── SwapRequest.java
    │   │       │   ├── SwapStatus.java
    │   │       │   └── User.java
    │   │       ├── repository
    │   │       │   ├── EventRepository.java
    │   │       │   ├── SwapRequestRepository.java
    │   │       │   └── UserRepository.java
    │   │       └── service
    │   │           ├── EventService.java
    │   │           ├── EventServiceImpl.java
    │   │           ├── SwapService.java
    │   │           ├── SwapServiceImpl.java
    │   │           ├── UserService.java
    │   │           └── UserServiceImpl.java
    │   └── resources
    │       └── application.properties
```

### Frontend (`slotswapperfrontend`)
```
slotswapperfrontend
├── node_modules
├── public
└── src
    ├── assets
    ├── components
    │   ├── ui
    │   │   ├── EventForm.jsx
    │   │   ├── EventList.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── SwappableList.jsx
    ├── context
    │   └── AuthContext.jsx
    ├── pages
    │   ├── Dashboard.jsx
    │   ├── Login.jsx
    │   ├── Requests.jsx
    │   └── Signup.jsx
    └── services
        └── api.js
```

---

## Development Summary

### Backend
I started the project by implementing the backend. I created a Spring Boot starter project and added required dependencies:
`spring-boot-starter-web`, `spring-boot-starter-data-mongodb`, `spring-boot-starter-security`, JWT libraries, and `spring-boot-devtools`.

Key points:
- Modular package structure: model, repository, service, service-impl, controller, config, dto.
- Implemented JWT authentication and Spring Security (JwtUtil, JwtAuthenticationFilter, SecurityConfig).
- DTOs for request & response separation and validation (Jakarta Bean Validation).
- Swap logic with transactional safety to prevent inconsistent states during swaps.
- MongoDB Atlas connection configured in `application.properties`.
- Used Postman to validate endpoints (signup, login, event CRUD, swap flows).

### Frontend
After the backend was stable and tested, I built the frontend with React + Vite and Tailwind CSS.
- Organized components, pages, context (AuthContext) and services (Axios wrapper).
- Implemented protected routes, JWT token handling in localStorage, and Axios interceptors for authorization.
- Built responsive UI components (EventForm, EventList, SwappableList, Navbar).
- Verified end-to-end flows manually (Signup → Login → Create Event → Mark SWAPPABLE → Request Swap → Accept/Reject).

### Containerization & CI/CD
- Created Dockerfiles for both backend and frontend and built images.
- Wrote `docker-compose.yml` to spin up backend and frontend together for local testing.
- Configured GitHub Actions workflow to build & push Docker images to Docker Hub on `main` branch pushes. Secrets were used to store Docker Hub credentials.
- Deployed frontend to Vercel and backend to Render.com. Also used uptimebot to keep the backend warm (ping every 4–5 minutes).

---

## Configuration (Docker Compose)

Save this as `docker-compose.yml` and run locally with `docker-compose up -d`:

```yaml
version: "3.8"
services:
  backend:
    image: 2300090230/slotswapperbackend:latest
    container_name: springboot
    ports:
      - "2025:2420"
    environment:
      SPRING_DATA_MONGODB_URI: mongodb+srv://root:root@laxman.xmhzqpt.mongodb.net/SlotSwapper?retryWrites=true&w=majority&appName=laxman
      SPRING_APPLICATION_NAME: SlotSwapperBackend
      SERVER_PORT: 2420
      LOGGING_LEVEL_COM_SERVICEHIVE_SLOTSWAPPER: DEBUG
      LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_DATA_MONGODB: DEBUG
    restart: on-failure
    networks:
      - springboot-mongo-net

  frontend:
    image: 2300090230/slotswapperfrontend:latest
    container_name: react
    ports:
      - "3000:80"
    depends_on:
      - backend
    restart: on-failure
    networks:
      - springboot-mongo-net

networks:
  springboot-mongo-net:
```

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/signup` — Register new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user info (requires auth)

### Events
- `POST /api/events` — Create new event (auth required)
- `GET /api/events` — Get all user's events (auth required)
- `GET /api/events/{id}` — Get event by ID (auth required)
- `PUT /api/events/{id}` — Update event (auth required)
- `PATCH /api/events/{id}/status` — Update event status (auth required)
- `DELETE /api/events/{id}` — Delete event (auth required)

### Swap
- `GET /api/swappable-slots` — Get all swappable slots (auth required)
- `POST /api/swap-request` — Create swap request (auth required)
- `POST /api/swap-response/{requestId}` — Respond to swap request (auth required)
- `GET /api/swap-requests/incoming` — Get incoming swap requests (auth required)
- `GET /api/swap-requests/outgoing` — Get outgoing swap requests (auth required)

**Example requests**:
```bash
POST http://localhost:2420/api/auth/signup
{
  "name": "Laxman",
  "email": "2300090230csit@gmail.com",
  "password": "laxman@123"
}

POST http://localhost:2420/api/auth/login
{
  "email": "2300090230csit@gmail.com",
  "password": "laxman@123"
}

POST http://localhost:2420/api/events
Authorization: Bearer <token>
{
  "title": "Team Meeting",
  "startTime": "2024-11-01T10:00:00",
  "endTime": "2024-11-01T11:00:00"
}
```

---

## Repositories & Deployment Links

- GitHub (Actions repo - contains Dockerfiles and docker-compose):  
  https://github.com/2300090230/ServiceHiveAssignmentDockerGitActions.git

- Backend repo (with backend Dockerfile):  
  https://github.com/2300090230/SmartHiveBackend.git

- Frontend repo (Vercel config):  
  https://github.com/2300090230/SlotSwapper.git

- Live Deployment (Frontend):  
  https://slotswapper-beta.vercel.app

---


## How to run locally (quick start)

**Backend**
1. Clone backend repo and update `application.properties` with your MongoDB URI.
2. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```
Server runs on `http://localhost:2420`

**Frontend**
1. Clone frontend repo.
2. Install and run:
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (Vite default) — adjust to `3000` if using production build served on nginx.

**Docker Compose (optional)**:
Save `docker-compose.yml` and run:
```bash
docker-compose up -d
```

---

## Assumptions & Notes
- JWT is used for stateless auth; tokens are stored in localStorage on the client (acceptable for this scope). Consider secure cookies for production.  
- Swap operations are transactional to avoid inconsistent states; extra concurrency handling may be required for high-load production scenarios.  
- MongoDB Atlas connection string in this README includes sample credentials — **do not commit real secrets** to public repos. Use GitHub Secrets / environment variables in CI/CD.

---

