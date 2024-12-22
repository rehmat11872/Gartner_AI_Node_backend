# GrantEater Backend

GrantEater Backend is a Node.js-based backend API designed for grant management, user authentication, and question submission. This project uses MongoDB for data storage and provides Swagger documentation for easy API exploration and testing.

---

## Features

- **User Authentication**: Register, login, and manage users.
- **Grant Management**: Create, retrieve, and manage grants.
- **Question Submission**: Submit and manage questions related to grants.
- **API Documentation**: Fully documented API using Swagger.

---

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repository/granteater-backend.git
cd granteater-backend
```

### 2.  Install Dependencies
```bash
npm install
```

### 3.  Configure Environment Variables
Create a .env file in the root directory with the following variables:
```bash
PORT=5000
JWT_SECRET=<your_jwt_secret>
ATLAS_URI=<your_mongodb_connection_string>
```

### 4. Start the Server
```bash
npm start
```

## API Documentation
The API documentation is available via Swagger. Once the server is running, navigate to:
    Swagger UI: http://localhost:5000/api-docs
    JSON Specification: http://localhost:5000/docs.json

## Contributing
Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details