# Hospital Management API

## Description

This project is a RESTful API for managing hospital data, including patients and their reports. It is built using Node.js, Express, and MongoDB with Mongoose.

## Features

- Add, update, delete, and retrieve patient information
- Add, update, delete, and retrieve report information
- Fetch all reports for a specific patient
- Fetch all reports by status

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/hospital-management-api.git
    cd hospital-management-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Setup environment variables**:

    Create a `.env` file in the root directory and add the following:
    ```env
    PORT = 8000
    MONGODB_URI = mongodb://localhost:27017
    CORS_ORIGIN = *
    TOKEN_SECRET = your-token-secret
    TOKEN_EXPIRY = 1d
    ```

4. **Start the server**:
    ```bash
    npx nodemon index
    ```

5. **Link to Postman**
[
Postman]([https://](https://api.postman.com/collections/34093212-4a9bc819-fe9e-4361-90bc-a10cd8580b11?access_key=PMAT-01J2FW0SJ8TTH0ZAQS1FP1EGDQ))

The link gives json data, open Postmana on your local machine, import a collection and paste the json data while importing.