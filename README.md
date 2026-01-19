# Task Manager - Aplicație Web Full-Stack

 Robert Sterea  
 Universitatea Danubius  
 Anul 2


 Tehnologii Folosite

**Frontend**
- Next.js - framework React
- TypeScript - pentru cod mai sigur
- Tailwind CSS - pentru design

**Backend**
- Node.js + Fastify - serverul care gestioneaza cererile
- PostgreSQL - baza de date
- Prisma - pentru comunicarea cu baza de date
- JWT - pentru autentificare



 Functionalitati:

- **Autentificare:** Inregistrare si login cu parola criptata
- **Task-uri:** Creeaza, editeaza si sterge task-uri
- **Organizare:** Task-urile sunt organizate in 3 coloane (To Do, In Progress, Done)
- **Statistici:** Vezi cate task-uri ai în total și pe fiecare categorie
- **Prioritate:** Marcheaza task-urile ca LOW, MEDIUM sau HIGH
- **Deadline:** Seteaza o dată limita pentru task-uri
- **Design Responsive:** Functioneaza pe telefon, tabletă si desktop

---



## Pornirea aplicatiei:

### 1. De instalat:
- Node.js (versiunea 18+)
- PostgreSQL (versiunea 14+)

### 2. Clonarea proiectului:

git clone https://github.com/robertalexandru02/task-management-system.git
cd task-management-system


### 3. Pornire backend:

cd backend
npm install


Creeaza fisierul `.env` si pune:

DATABASE_URL="postgresql://postgres:parola@localhost:5432/taskmanager?schema=public"
JWT_SECRET="parola lungime 32"
PORT=3001


Apoi:

npx prisma generate
npx prisma migrate dev
npm run dev

Backend-ul ruleaza pe `http://localhost:3001`

### 4. Pornire Front-end:

cd frontend
npm install


Creeaza fisierul `.env.local` :

NEXT_PUBLIC_API_URL=http://localhost:3001


Apoi:

npm run dev


Frontend-ul ruleaza pe `http://localhost:3000`

---

## API Endpoints

**Autentificare:**
- `POST /api/auth/register` - Inregistrare user nou
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Info despre user-ul logat

**Task-uri:**
- `GET /api/tasks` - Lista tuturor task-urilor
- `POST /api/tasks` - Creeaza task nou
- `PUT /api/tasks/:id` - Modifica task
- `DELETE /api/tasks/:id` - Sterge task
- `GET /api/tasks/stats` - Statistici


**Link GitHub:** https://github.com/robertalexandru02/task-management-system

