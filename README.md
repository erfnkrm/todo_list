[README (1).md](https://github.com/user-attachments/files/22634918/README.1.md)
# Django React Todo App

A full-stack todo application built with Django backend and React frontend.

## Features

- Create, read, update, and delete todos
- Filter todos by status (all, active, completed)
- Todo statistics
- Responsive design with Tailwind CSS

## Tech Stack

- **Backend**: Django
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites

- Python 3.x
- Node.js and npm
- Git

### Backend Setup

1. Navigate to the project root directory
2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```
   python manage.py migrate
   ```
4. Start the Django server:
   ```
   python manage.py runserver
   ```
   The backend will run on `http://127.0.0.1:8000/`

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd front-react
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on `http://localhost:5173/`

## Available Scripts

In the `front-react` directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## API Endpoints

- `GET /api/todos/` - List all todos
- `POST /api/todos/` - Create a new todo
- `GET /api/todos/{id}/` - Get a specific todo
- `PUT /api/todos/{id}/` - Update a todo
- `DELETE /api/todos/{id}/` - Delete a todo

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
