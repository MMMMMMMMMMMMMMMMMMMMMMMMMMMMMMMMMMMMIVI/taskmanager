# Project: Task Manager App

### Description:
Create a simple task manager application where users can add, view, and delete tasks. The frontend will be built using React, and the backend will be built using Kotlin with Spring Boot.

### Features:

1. Frontend (React):

    - A form to add a new task (title, description, and due date).
    - A list to display all tasks.
    - A button to delete a task.
    - Basic styling using CSS or a library like TailwindCSS.

2. Backend (Kotlin):

    - REST API endpoints to handle CRUD operations (Create, Read, Delete).
    - Store tasks in memory (no database required for this small project).
    - Use Spring Boot to build the API.


<br>

### To-Do:

Frontend (React):

-[x] Set up a React project using create-react-app.
-[x] Create a form component to add tasks.
-[ ] Create a list component to display tasks.
-[ ] Use fetch or axios to communicate with the backend API.
-[ ] Add functionality to delete tasks.

Backend (Kotlin):

-[x] Set up a Kotlin project using Spring Boot.
-[x] Create a Task data class with fields like id, title, description, and dueDate.
-[ ] Implement REST endpoints:
-[ ] GET /tasks - Fetch all tasks.
-[ ] POST /tasks - Add a new task.
-[ ] DELETE /tasks/{id} - Delete a task by ID.
-[ ] Store tasks in a mutable list (in-memory storage).


<br><br>

# Setting up the project

### Spring Boot
1. Install Intellij IDEA
2. Create new project
3. Select Spring Boot project
4. Follow Creation Wizard
5. As Dependencies Select 
   - Web &rarr; Spring Web
   - SQL &rarr; Spring Data JDBC and H2 Database

### React
1. In Console do the following:
   1. npx create-react-app frontend  
   2. cd frontend 
   3. npm start
2. Detailed information is found in [.\frontend\README.md](./frontend/README.md)