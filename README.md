# Test Coding Assignment by Juan Ordosgoite


# Assignment:
It contains a simple web app allowing users to send emails. The app has the following features:  
## 1. Sidebar
1. The main page has a sidebar with a list of emails (similar to Apple Mail style)
2. When selecting an email from the sidebar, the selected email is being displayed on the right side of the screen

## 2. Search bar
1. The sidebar contains a search bar at the top
2. When typing text in the search bar, the list of emails in the sidebar is being filtered based on the search text
   * Filtering is being done on the backend
   * It debounces requests to the backend (500ms after the user stops typing before sending the request)
   * The search returns results where either the `to`, `cc`, `bcc`, `subject`, or `subject` fields contain the search text

## 3. Sending emails
The main page has a button to compose a new email (placed at the bottom right corner of the screen). The following fields should be present in the compose email form:
   * To
   * CC
   * BCC
   * Subject
   * Body


# Notes:
1. It's not sending the email actually - it's just saving it in the database
3. `.next` folder was removed
4. `dev.sqlite3` folder was removed
5. `node_modules` folders was removed
6. The axios dependency was added to facilitate data fetching from the UI to the backend.

# Structure
This is a monorepo. It has two folders:  
1. `frontend`: This is the frontend of the application. It is built using Next.js.  
2. `backend`: This is the backend of the application. It is built using Fastify.

# Setup
1. `cd frontend` - Go to the frontend folder
2. `yarn install` - Install the dependencies
3. `yarn dev` - Start the development server (http://localhost:3000)
4. `cd ../backend` - Go to the backend folder
5. `yarn install` - Install the dependencies
6. `yarn migrate` - Run the knex db migrations
7. `yarn dev` - Start the development server (http://localhost:3001)

# Design
1. [MUI](https://mui.com/) is installed and used for the design of the frontend.
