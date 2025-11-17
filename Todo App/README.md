# ⚛️ Full-Stack React + Redux Toolkit Todo App (CRUD)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

A sleek, professional **full-stack Todo App** built with **React**, **Redux Toolkit**, **Express.js**, and **Tailwind CSS**, implemented with full **CRUD** (Create, Read, Update, Delete) functionality, **server-side persistence**, and a **Light / Dark theme toggle**. The project uses `npm` for frontend and `pnpm` for backend development and build tasks.

## 📝 About

This project serves as a comprehensive example of a full-stack web application, demonstrating the seamless integration of a React-based frontend with an Express.js backend. It implements complete CRUD operations, efficient state management using Redux Toolkit, and responsive design with Tailwind CSS. Ideal for developers seeking a reference implementation of modern web development practices.

---

## 📸 Todo UI

![Todo App Screenshot](../Todo%20App/Frontend/src/assets/1.png) <br><br>
![Todo App Screenshot](../Todo%20App/Frontend/src/assets/2.png)

---

## 📸 Todo UI Video

![Todo App Screenshot](../Todo%20App/Frontend/src/assets/Redux%20-%20Todo%20App.gif)

---

## 🔧 Key Features

- Full CRUD support:
  - Create new todos
  - Read / view todo details (modal)
  - Update (inline edit with keyboard support)
  - Delete single todos
- Toggle todo status (complete / incomplete) with visual feedback:
  - Completed items: strike-through, fade, and automatic move to bottom (incomplete-first sorting)
- Light / Dark theme toggle with persisted preference
- Persistent todos using **Express.js backend** (survive page reload and server restarts)
- Responsive, accessible, and professional UI built with Tailwind CSS
- State management with Redux Toolkit (`createSlice`, `configureStore`, `useSelector`, `useDispatch`)
- Built with Vite for a fast dev experience
- Uses `npm` for dependency management and scripts

---

## 🗂 Project Structure

```bash
todo-app/
│
├── Backend/
│ ├── app.js # Express app setup and API routes
│ ├── server.js # Server entry point
│ ├── package.json
│ ├── pnpm-lock.yaml
│ └── .gitignore
│
├── Frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── app/ # Redux store (store.js)
│ │ ├── assets/ # Images / icons / mock data
│ │ ├── components/ # Reusable components (Modal, Todo)
│ │ ├── contexts/ # AppContext for theme & modal state
│ │ ├── features/ # Redux slices (todo.js)
│ │ ├── App.jsx # App wrapper
│ │ ├── main.jsx # React entry (with Provider)
│ │ ├── index.css # Tailwind + global CSS
│ │
│ ├── .gitignore
│ ├── package.json
│ ├── package-lock.json
│ ├── pnpm-lock.yaml
│ ├── README.md
│ ├── tailwind.config.cjs
│ ├── vite.config.js
│ └── postcss.config.cjs
```

## 🚀 Quick Start

### 1. Clone

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Install Dependencies

#### Backend (using pnpm)

```bash
cd Backend
pnpm install
```

#### Frontend (using npm)

```bash
cd ../Frontend
npm install
```

### 3. Run (development)

#### Start Backend

```bash
cd Backend
pnpm dev
```

#### Start Frontend (in a new terminal)

```bash
cd Frontend
npm run dev
```

### 4. Build (production)

#### Frontend

```bash
cd Frontend
npm run build
npm run preview
```

## 📦 Tech Stack

| Tool                                           | Purpose                                |
| ---------------------------------------------- | -------------------------------------- |
| [React](https://reactjs.org/)                  | Frontend UI library                    |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Scalable global state management       |
| [React Redux](https://react-redux.js.org/)     | React bindings for Redux Toolkit       |
| [Tailwind CSS](https://tailwindcss.com/)       | Utility-first styling framework        |
| [Vite](https://vitejs.dev/)                    | Fast development server and build tool |
| [Express.js](https://expressjs.com/)           | Backend web framework                  |
| [CORS](https://www.npmjs.com/package/cors)     | Enable cross-origin requests           |
| [npm](https://www.npmjs.com/)                  | Frontend package manager               |
| [pnpm](https://pnpm.io/)                       | Backend package manager                |

## 🔌 API Endpoints

The backend provides RESTful API endpoints for todo management:

- **GET /api/todos** - Retrieve all todos
- **POST /api/todos** - Create a new todo (body: `{ "title": "string" }`)
- **PATCH /api/todos/:id** - Update todo title (body: `{ "title": "string" }`)
- **PATCH /api/todos/:id/status** - Toggle todo status (complete/incomplete)
- **DELETE /api/todos/:id** - Delete a todo

All endpoints return JSON responses. The backend uses in-memory storage (resets on server restart).

## 🎨 UI & UX

### ✏️ Inline Edit

- Click **Edit** → `editingId` is set → input appears pre-filled.
- Save with **Enter key** or **Save button** to dispatch `updateTodo`.
- During edit, other controls use `pointer-events-none`; input uses `pointer-events-auto`.

### 👁️ View Modal

- Click **View** → sets `modalInfo` → opens modal (`view` state).
- Modal receives `todo` prop and displays details.
- Uses `(todo ? ... : ...)` safe check to avoid crashes.

### 🔄 Sorting & Animations

- Incomplete todos appear before completed ones:
  ```javascript
  .sort((a, b) => a.status - b.status)
  ```

---

### ♿ Accessibility

- Buttons have `title` attributes & accessible labels.
- Focus-visible rings for keyboard navigation via Tailwind’s `focus:` utilities.
- Inputs auto-focus in edit mode for keyboard-friendly editing.

### **3. Contributing Guidelines**

Professional projects usually have a short contributing section.

```markdown
🤝 Contributing

Contributions are welcome!

1. Fork this repo.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Added new feature"`
4. Push to your branch: `git push origin feature-name`
5. Open a Pull Request.

Please follow the existing code style and write clear commit messages.
```

## 👤 Author

**Rohit Pakhre**
