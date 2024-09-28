# DocumentSubmission

## Development Setup

This project uses `concurrently` to run both the server and client simultaneously.

### Starting the Application

To start the application, run the following command in your terminal:

```bash
npm start

This command executes the following:

npm run server: Starts the backend server using nodemon, which automatically restarts the server upon file changes.
npm run client: Navigates to the client directory and starts the React application.
Scripts
The following scripts are available in the package.json:

start: Runs both the server and client concurrently.
server: Starts the Express server with nodemon.
client: Starts the React application.
test: Placeholder for running tests.
Make sure to have all dependencies installed before starting the application:

npm install


