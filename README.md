📝 Taskify

Taskify is a modern and efficient MERN Stack Todo App designed to help users organize, manage, and track their daily tasks seamlessly.
It features secure authentication, real-time updates, and a beautiful responsive UI built for productivity lovers.

🚀 Live Demo

🔗 Coming Soon (Deploy it on Render, Vercel, or Netlify)

💡 Features

✅ User Authentication (JWT-based login & signup)
✅ Create, Edit, and Delete Todos
✅ Mark tasks as complete or pending
✅ Filter tasks by status
✅ Responsive UI with modern design
✅ Toast notifications for better user experience
✅ Secure backend API with Express.js & MongoDB

🧠 Tech Stack

Frontend:

React.js

Axios

React Router

Toastify (for notifications)

Tailwind CSS / CSS Modules

Backend:

Node.js

Express.js

MongoDB (Mongoose)

JSON Web Tokens (JWT)

bcrypt.js

⚙️ Installation & Setup

Follow these simple steps to run Taskify locally 👇

1️⃣ Clone the repository
git clone https://github.com/Dayapal/Taskify.git
cd Taskify

2️⃣ Install dependencies

For backend:

cd backend
npm install


For frontend:

cd frontend
npm install

3️⃣ Setup environment variables

Create a .env file inside the backend folder and add:

PORT=4002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key

4️⃣ Run the app

Run backend:

npm start


Run frontend:

npm run dev


Then visit 👉 http://localhost:5173
 (or your frontend port)

📂 Project Structure
Taskify/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── main.jsx
│
└── README.md

💪 Future Enhancements

Add dark/light mode

Add due dates and reminders

Integrate drag-and-drop task reordering

Add collaborative task lists (team support)

👨‍💻 Author

Daya Pal
💼 Full Stack Developer (MERN)
🌐 GitHub Profile
