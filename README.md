# 🩸 BloodConnect: A Production-Grade Blood Donation Ecosystem

[![Live Demo](https://img.shields.io/badge/Live-Demo-red?style=for-the-badge)](https://snazzy-salamander-1be15f.netlify.app/)
[![Client Repo](https://img.shields.io/badge/Client-GitHub-blue?style=for-the-badge)](https://github.com/mehedihasan53/blood-donation-client.git)
[![Server Repo](https://img.shields.io/badge/Server-GitHub-black?style=for-the-badge)](https://github.com/mehedihasan53/blood-donation-server.git)

BloodConnect is not just a donation portal; it's a mission-critical platform designed with a **Security-First** and **Scalable Architecture**. Built to handle real-time blood requests, user role-based access control (RBAC), and complex data relationships, it ensures high availability for life-saving situations.

---

## 🏗️ System Architecture & Engineering

As a production-level application, BloodConnect implements several high-end engineering patterns:

### 1. Role-Based Access Control (RBAC)

The system uses a 3-tier authorization layer:

- **Admin Layer:** Full CRUD over users, requests, and system configurations.
- **Volunteer Layer:** Content moderation and request status management without administrative destructive power.
- **Donor Layer:** Personal dashboard for tracking requests and profile management.

### 2. State Management & Data Fetching

- **Optimistic UI Updates:** Used via TanStack Query for a seamless UX during status transitions.
- **Persistence:** JWT-based authentication combined with Firebase for robust session handling.

### 3. Security Implementation

- **JWT Verification:** Custom middleware on the server side to protect private API endpoints.
- **Data Validation:** Strict schema validation on MongoDB to prevent NoSQL injection and ensure data integrity.
- **CORS Configuration:** Restrictive cross-origin resource sharing to prevent unauthorized access.

---

## 🚀 Advanced Features

- **📍 Intelligent Geolocation Logic:** Filter-based matching using District/Upazila hierarchy to find the nearest donors quickly.
- **⏱️ Real-time Status Tracking:** Blood requests transition through states (`Pending` → `InProgress` → `Done`/`Canceled`) with automatic UI updates.
- **📊 Comprehensive Analytics:** Admin dashboard with statistical overview of total users, pending requests, and successful donations.
- **📱 Fluid UI/UX:** Built with Tailwind CSS focusing on **Mobile-First Design**, ensuring accessibility during emergencies.

---

## 🛠️ Technical Implementation (The Stack)

### Frontend (Modern SPA)

- **React (Vite):** Blazing fast build tool for high performance.
- **Axios Interceptors:** Centralized API handling with automatic token injection.

### Backend (RESTful API)

- **Node.js & Express:** Lightweight, event-driven architecture for handling high-concurrency requests.
- **MongoDB Aggregations:** Complex data querying for efficient donor matching.
- **JWT Security:** Middleware-based protection for all sensitive routes.

---
