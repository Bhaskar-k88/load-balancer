# 🚀 Load Balancer Dashboard

A full-stack project that simulates a real-world load balancer with a monitoring dashboard and analytics.

---

## 📌 Features

### 🔧 Backend (Node.js + Express)

* Round-robin load balancing
* Failover handling (removes failed servers)
* Auto recovery using health checks
* Request count tracking per server
* Response time measurement

### 🎨 Frontend (React + Vite)

* Clean dashboard UI
* Real-time server status (Active / Down)
* Request count display
* Response time monitoring
* Separate Analytics page with charts

---

## 📊 Analytics

* Visual representation of request distribution using charts
* Helps understand how load is distributed across servers

---

## 🏗️ Project Structure

```
backend/
  ├── load-balancer/
  ├── server1/
  ├── server2/
  └── server3/

frontend/
  ├── src/
       ├── Components/
       ├── Pages/
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/load-balancer-project.git
cd load-balancer-project
```

---

### 2. Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd ../frontend
npm install
```

---

### 3. Run the project

#### Start servers

```
node servers/server1/index.js
node servers/server2/index.js
node servers/server3/index.js
```

#### Start load balancer

```
node load-balancer/index.js
```

#### Start frontend

```
cd frontend
npm run dev
```

---

## 🌐 Usage

* Open frontend in browser
* Send requests using dashboard
* View server status (Active / Down)
* Navigate to Analytics page for charts

---

## 🧠 Learnings

* Load balancing concepts (round-robin)
* Failover and system resilience
* Backend performance monitoring
* Real-time UI updates in React
* Building scalable full-stack systems

---

## 📷 Screenshots

(Add your screenshots here)

---

## 🔗 GitHub Repository

(Add your GitHub repo link here)

---

## 📢 Author

Built by [Your Name]

---

## ⭐ If you like this project, give it a star!
