# 🌤️ Technical Task Overview

This tasks consist in a simple weather web application that fetches temperature data from a simple API.

## 🧩 Technologies Chosen

**Frontend:**  
React using vite, with a simple application and a single component responsible for displaying the average temperature.

**Backend:**  
Node.js, applying Domain-Driven Design (DDD) with Express for simplicity and speed in this small-scale implementation.  
I focused primarily on backend, as this aligns with my expertise and the requirements of the profile needed.

---
## ⚡ Why Vite

Basically for three good reasons:

- **Speed:** Lightning-fast development server and build times.  
- **Simplicity:** Minimal configuration, easy to get started and maintain.  
- **Reliability:** A proven, stable tool widely adopted in modern React projects — we know it works.
---

## 🧠 Why DDD

The DDD-based architecture aligns with the company’s/job goals of building scalable, maintainable systems with clear technical vision.

### Key benefits of this approach include:

- **Scalability & maintainability:** separation of concerns allows the system to grow with minimal coupling.  
- **Business-aligned technical vision:** a common language improves communication across teams.  
- **Modern engineering practices:** facilitates CI/CD, automated testing, and cloud deployment (e.g., AWS).  
- **Clean, testable, and adaptable code:** structured to evolve without compromising system coherence.  


This approach also demostrates my backend expertise, clean architecture mindset, and readiness to build complex, scalable systems, while providing a foundation that can easily evolve as part of a larger weather data integration epic.


## 🧩 Installation & Running

1. **Clone the repository**
   git clone <your-repo-url>
   cd <your-repo-folder>

2. **Install dependencies**
   cd backend && npm install
   cd ../frontend && npm install

3. **Run the development servers**
   cd backend && npm run dev
   cd ../frontend && npm run dev

**Alternatively, you can run everything with Docker**
   docker-compose up --build

   This command will start both the backend and frontend services in containers, making setup easier and consistent across environments.


## ⚡ Posible Features

Possible features to implement or extend in the system:

- **Logging system (Logger):** Centralized logging of events and errors open to integrate to Cloudwatch.  
- **Input validation with schemas (e.g., ZOD):** Ensures incoming data meets expected rules.  
- **Error handler for controllers:** Centralizes error handling and provides consistent API responses.
- **Production version and scripts:** We will need scripts to build and deploy the application in a production environment.
- **Integration with external repositories:** Connect additional services such as databases, third-party APIs, etc.

