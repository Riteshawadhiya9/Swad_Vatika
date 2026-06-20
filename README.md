# 🍽️ Swad Vatika — Modern Premium Indian Diner

Welcome to **Swad Vatika**, a premium, full-stack luxury restaurant web application built with a **Modern Vibrant Dark Mode** and **Dark Glassmorphism** design language. 

This platform offers a seamless customer ordering flow, a 3D table reservation module, and a password-secured live Admin Command Center to manage sales analytics, process orders, and control the recipe catalog.

---

## 🌟 Key Features

### 1. Interactive Menu Explorer
* **Smooth 3D Hover Interactions**: Leverages Framer Motion's perspective engine to dynamically tilt, float, and rotate recipe cards on hover.
* **Smart Filter & Search**: Instantly search for dishes or filter the menu using floating category pills (Starters, Mains, Biryani, Breads, Desserts, Drinks).
* **Veg / Non-Veg Badges**: Highlights dietary options with glowing green and crimson indicators.

### 2. Reactive Platter (Shopping Cart)
* **Global State Provider**: Powered by a robust React Context to manage selected items, quantities, and totals across pages.
* **Side Drawer Panel**: A sliding frosted glass panel (`backdrop-blur-3xl`) featuring real-time addition, subtraction, deletion, and subtotal calculation.
* **Tax & GST Breakdown**: Calculates a 5% GST on the checkout sheet with packing and delivery marked as complimentary.

### 3. 3D Table Reservation System
* **Slot Allocations**: Form inputs allow customers to book tables for specific guest counts, dates, and times.
* **3D Flip Card Effect**: On booking completion, the interface performs a smooth 180° rotation to reveal a detailed royal booking receipt card.

### 4. Admin Command Center
* **Vault Code Lock**: Secured by a centered glass login card requiring the password (`swad2024`) to enter the dashboard.
* **Dynamic Stats Deck**: High-tech stat cards measuring Gross Revenue (₹), Placed Orders, Active Bookings, and Catalog Items, with custom mouse-glow effects.
* **Interactive Data Tables**: Clean data logs showing orders and bookings with hover highlights.
* **Live Status Dropdowns**: Update order states (`Pending`, `Confirmed`, `Delivered`) or reservation logs (`Pending`, `Confirmed`, `Cancelled`) with instant PATCH requests.
* **Recipe Catalog Manager**: Form to upload new dishes (with auto-assign default Unsplash mock images) and deletion buttons to purge items from the database.

---

## 🚀 Tech Stack

### Frontend
* **Core**: React 18, Vite (Fast build system)
* **Styling**: Tailwind CSS v4, PostCSS, Vanilla CSS
* **Animations**: Framer Motion (Spring physics, sliding layout underlines, 3D card flips)
* **Icons**: Lucide React
* **HTTP Client**: Axios

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB Atlas (with Mongoose ODM)
* **CORS**: Configured for local cross-origin request handling

---

## 📂 Project Architecture

```
restraunt/
├── client/                 # React Frontend Application
│   ├── public/             # Icons & Favicon
│   ├── src/
│   │   ├── assets/         # Project images & icons
│   │   ├── components/     # Navbar, Footer, CartSidebar
│   │   ├── context/        # CartContext global provider
│   │   ├── pages/          # Home, Menu, Book, Order, Admin views
│   │   ├── App.jsx         # App routing structure
│   │   └── main.jsx        # App entry point
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                 # Express.js REST API Backend
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # API Endpoints (/menu, /orders, /reservations, /analytics)
│   ├── seedData.js         # Script to seed database with 16 royal dishes
│   └── server.js           # Server starter file
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v16.0 or higher recommended)
- **MongoDB Atlas** (or a local MongoDB instance running)

### Step-1: Set up the Backend Server
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` folder and paste your database credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Seed the database with the menu catalog:
   ```bash
   node seedData.js
   ```
5. Start the backend in development mode:
   ```bash
   npm run dev
   ```

### Step-2: Set up the React Frontend
1. Open a new terminal and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`.

---

## 🔑 Default Credentials

- **Admin Chambers Password**: `swad2024`

---

## 📡 API Endpoints Reference

### 🍽️ Menu
- `GET /api/menu` — Fetch all menu items from database
- `POST /api/menu` — Insert a new dish (Admin)
- `DELETE /api/menu/:id` — Delete a dish from the catalog (Admin)

### 🛍️ Orders
- `GET /api/orders` — Retrieve list of all orders (Admin)
- `POST /api/orders` — Create a new order at checkout
- `PATCH /api/orders/:id` — Update order status (Admin)

### 📅 Reservations
- `GET /api/reservations` — Retrieve reservation logs (Admin)
- `POST /api/reservations` — Book a new table
- `PATCH /api/reservations/:id` — Update booking status (Admin)

### 📊 Analytics
- `GET /api/analytics` — Fetch gross revenue, total orders, bookings count, and active menu items
