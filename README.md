### 1. Project Title

The Confused Coder

### 2. Description

This collab project aims to provide a space to centralize and organize learning materials for novice coders.

### 3. Features

- file and image upload
- textfield to be able to enter notes
- category filter to keep materials organized
- public ressources as well as login feature for private resources

### 4. Installation

After cloning the repo into your computer, you will need to..

- cd into the project folder and `npm install` dependecies
- cd into the client folder and `npm install` dependencies

### 5. Database prep

Create a local MySQL database.
Add a .env to your root folder containing the MySQL authentication information for the root user as well as the name of your database. For example:
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=YOURPASSWORD
  DB_NAME=YOURDATABASE
  SUPER_SECRET = lotsOfCandy
Run `npm run migrate` in your terminal in order to create the DB tables.

### 6. Development

Run `npm start` in project directory to start the Express server on port 4000
cd client and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
You can test your client app in http://localhost:5173

### 7. Usage

The TopNav presents three buttons. The buttons shown depend on the login state:

- logged-out users see 'Login', 'Resources' and 'Register'
- logged-in users serr 'Logout', 'Resources' and 'Upload'

The SideNav presents three available categories:

- JavaScript
- Front-End
- Back-End

Logged-in users have the additional functionality of adding their own categories and resources at the upload page. Logged-out users are able to see and make use of hardcoded resources that are filtered by category and will render on the resource page by clicking on the respective category filter.

### 8. Technologies Used

This project is built with React for its front end component, mySQL for its database, and Express and NodeJS for the beckend.
The styling was mostly done with bootstrap: https://getbootstrap.com/

### 9. Architecture

There are seven main routes connecting the front- and backend to three main tables:

- a GET endpoint connected to the 'categories' and 'resources' table
- a POST endpoint to insert into the 'categories', 'resources' and 'users' table
- a DELETE endpoint to delete from the 'categories' table
- a PUT endpoint to update/delete from the 'resources' table