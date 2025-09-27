# 🛠️ Jaspay Admin Portal

The **Jaspay Admin Portal** is the backend dashboard for managing the Jaspay ecosystem. Built with **Vue.js**, this portal enables admins and vendors to efficiently manage user accounts, grocery specials, and food stock inventory uploaded by users from different regions.

---

## Core Features

### 1. **User Management**
- View and manage registered Jaspay users.
- Assign roles (admin, vendor, user).
- Monitor activity and filter users by location.
- Suspend or flag suspicious accounts.

### 2. **Grocery Specials Aggregation**
- Upload and manage grocery specials submitted by users.
- Aggregate and display specials based on:
  - Location
  - Popularity or demand
  - Store or vendor
- Tag items with promo statuses like “50% Drop” or “Hot Deal”.

### 3. **Food Stock Inventory Management**
- Track stock items submitted by users or vendors.
- Update quantity, categories, and expiry info.
- View stock trends and low inventory warnings.
- Categorize items (vegetables, meat, grains, etc.).

---

## Tech Stack

- **Frontend**: Vue 3 + Vite
- **State Management**: Pinia / Vuex
- **UI Framework**: TailwindCSS or Vuetify
- **Backend (optional)**: Firebase Firestore / Node.js REST API

---

## Project Setup

```bash
## Install dependencies
npm install

## Start development server
npm run dev
src/
│
├── components/       → Reusable UI components
├── views/            → Admin pages (Users, Specials, Inventory)
├── store/            → Pinia or Vuex modules
├── assets/           → Styles, images
└── utils/            → API services and helpers
