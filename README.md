# Fetch Frontend Take-Home Assignment

## Live Demo & GitHub Repository
**Live Deployed App:** (take-home-ten.vercel.app)  
**GitHub Repository:** (https://github.com/hemchandl346/take-home.git)

##  About the Project
This project is a **React-based web application** that allows users to search for adoptable dogs using the **Fetch API**. 
Users can:
- **Authenticate via login**
- **Filter dogs by breed**
- **Sort results alphabetically**
- **Paginate through results**
- **Add Favorite dogs & generate a match**
- **View detailed dog information**

The project is built using **Create React App** and follows best practices in **React development**.

---

## Tech Stack & Dependencies
- **Frontend:** React.js
- **State Management & API Calls:** Axios
- **Routing:** React Router DOM
- **Deployment:** Vercel
- **Dependencies Used:**
  - `axios` → For handling API requests
  - `react-router-dom` → For client-side navigation
  - `create-react-app` → Project setup

---

Installation & Setup

Follow these steps to run the application locally.

1️⃣ Clone the Repository

git clone https://github.com/hemchandl346/take-home.git
cd take-home

2️⃣ Install Dependencies

npm install axios and react-router-dom

3️⃣ Run the Application

npm start

Features & API Usage

1️⃣ User Authentication

Users enter their name and email on the login page.

The app authenticates via Fetch's /auth/login API and stores session cookies.

2️⃣ Dog Search & Filtering

Fetches all available dog breeds from /dogs/breeds.

Users can filter results by breed.

3️⃣ Pagination & Sorting

Results are paginated (size=10, from=page * 10).

Sorting is available (breed:asc or breed:desc).

4️⃣ Favoriting & Matchmaking

Users can add dogs to favorites.

Clicking "Find My Match" sends favorite dog IDs to /dogs/match and retrieves a match.