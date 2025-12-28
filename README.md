# Assignment Workflow – Frontend

This repository contains the **frontend client** for the Assignment Workflow application, built using **React (Vite)** and **Tailwind CSS**.

The frontend is deployed on **Vercel**:

**Production URL:**  
https://assignment-workflow-fe.vercel.app/

---

## 🚀 Local Setup Instructions

Follow the steps below to run the frontend locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/AmanSingh29/assignment-workflow-fe
```

---

## 2️⃣ Open Project in VS Code

```bash
cd assignment-workflow-frontend
code .
```

---

## 3️⃣ Install Dependencies

Open the VS Code integrated terminal and run:

```bash
npm install
```

---

## 4️⃣ Configure Environment Variables

At the **root of the project**, create a file named `.env`.

Add the following value after running the backend server locally:

```env
VITE_API_BASE_URL="http://localhost:5000"
```

> ⚠️ Make sure the backend server is running before starting the frontend.

---

## 5️⃣ Build the Project

After saving the `.env` file, run:

```bash
npm run build
```

This will create a production-ready build.

---

## 6️⃣ Preview the Build Locally

Run the following command:

```bash
npm run preview
```

The terminal will show a local preview URL.  
Open that URL in **Google Chrome** (or any browser) to run the project.

---

## 🔁 Backend Port Forwarding (If Needed)

If the local backend URL (`http://localhost:5000`) does not work (for example, due to network or environment restrictions):

1. Forward the backend port **publicly** using **VS Code Port Forwarding**
2. Copy the generated public URL
3. Update the `.env` file like this:

```env
VITE_API_BASE_URL="https://pzp4j23s-5000.inc1.devtunnels.ms"
```

4. Repeat the following steps:
   ```bash
   npm run build
   npm run preview
   ```

The application will now work correctly with the forwarded backend URL.

---

## 🧩 Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Context API
- React Toastify

---
