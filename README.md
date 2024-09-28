# Candidate Document Submission Application

A MERN stack application for candidates to submit their personal details and upload documents for verification.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Development Setup](#development-setup)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration with personal details.
- Document upload functionality with validation.
- Age verification for candidates.
- Error handling for duplicate users.

## Technologies Used
- **Frontend:** React, Material UI, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **File Upload:** Multer
- **State Management:** Redux Toolkit Query (RTK Query)

## Installation
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies for both server and client:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

## Usage
1. **Start the application**:
    ```bash
    npm start
    ```
   This command will run both the server and client concurrently.

2. **Access the application**:
   - The client will be available at `http://localhost:3000`.
   - The server will run on `http://localhost:5000`.

## API Endpoints
- `POST /api/user/submit`: Submit candidate details and upload documents.
  - **Request Body**:
    - `firstName`
    - `lastName`
    - `email`
    - `dob`
    - `residentialAddress`
    - `permanentAddress`
    - `documents` (files)
  - **Response**:
    - Success: `201 Created`
    - Error: `400 Bad Request` (e.g., age validation, missing documents)

## Development Setup
To start the application during development, run the following command:

```bash
npm start
