# 🌱 EcoAudit

**EcoAudit** is a smart waste management and environmental monitoring platform designed to help campuses and communities report, track, and analyze waste in real time. It combines geolocation, cloud storage, interactive analytics, and community participation to promote sustainable environmental practices.

🔗 **Live Demo:** https://eco-audit-zeta.vercel.app/

---

## 📌 Features

### 🌍 Community Waste Map

* Interactive map displaying waste reports in real time.
* Color-coded markers based on report status:

  * 🟢 Verified
  * 🟡 Pending
  * 🔴 Rejected
* Built using Leaflet and OpenStreetMap.

### 📝 Waste Reporting

* Log waste with:

  * Waste category
  * Estimated weight
  * Community/Location
  * GPS coordinates
* Reports are stored instantly in Firebase Firestore.

### 📊 Analytics Dashboard

Provides real-time environmental insights including:

* Environment Score
* Community Performance
* Monthly Waste Trends
* Waste Category Distribution
* Top 5 Contributors
* Report Status Overview

### 🌱 Environment Score

A dynamic sustainability score (/100) calculated from waste statistics and reporting activity to provide an overview of environmental performance.

### 📍 Live Geolocation

Every waste report automatically captures the user's location and displays it on the Community Map.

### 🔐 Authentication

* Secure Login
* User Registration
* Firebase Authentication
* Protected Routes

### ⚡ Real-Time Updates

All charts, maps, statistics, and reports update instantly using Firebase Firestore listeners.

---

# 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* React Router
* Recharts
* React Leaflet
* Lucide React

### Backend

* Firebase Authentication
* Firebase Firestore

### Maps

* Leaflet
* OpenStreetMap

### Deployment

* Vercel

---

# 📂 Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── analytics/
│   ├── dashboard/
│   ├── landing/
│   ├── map/
│   └── auth/
│
├── firebase/
├── pages/
├── routes/
└── App.jsx
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/anubhavarya27/EcoAudit.git
```

Move into the project folder

```bash
cd EcoAudit
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 📈 Dashboard Features

* 📦 Total Waste Collected
* 📄 Total Waste Reports
* ✅ Verified Reports
* 🌱 Environment Score
* 📊 Waste by Category
* 📅 Monthly Waste Trend
* 🏆 Top Contributors
* 📌 Report Status Overview

---

# 🗺 Community Map

The Community Map displays every reported waste location across the campus using color-coded markers.

| Status   | Marker    |
| -------- | --------- |
| Verified | 🟢 Green  |
| Pending  | 🟡 Yellow |
| Rejected | 🔴 Red    |

---

# 🌱 Environment Score

The Environment Score is dynamically calculated based on:

* Total waste collected
* Number of waste reports submitted

Higher scores indicate better environmental performance, while lower scores highlight areas requiring improvement.

---

# 📸 Screens

* Landing Page
* Dashboard
* Analytics Dashboard
* Community Waste Map
* Waste Logging Portal
* Login & Signup

---

# 🔮 Future Enhancements

* 🤖 AI-powered waste image verification
* 📷 Automatic waste classification
* 🏆 Community leaderboard and rewards
* 📱 Mobile application
* 🔔 Push notifications
* 📄 Export reports (PDF/CSV)
* ♻️ Carbon footprint estimation
* 👨‍💼 Admin dashboard and moderation
* 📦 QR-based smart waste bins

---

# 👨‍💻 Author

**Anubhav Arya**

GitHub: https://github.com/anubhavarya27

---

# 📄 License

This project is developed for educational and academic purposes.
