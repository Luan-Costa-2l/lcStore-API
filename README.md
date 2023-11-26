# lcStore-API

lcStore-API is a RESTful API for an e-commerce application that allows users to buy and sell products online. It is built with Node.js, Express, MongoDB, and Mongoose.

## Features

- User authentication and authorization with Tokens and bcrypt
- CRUD operations for products, categories, orders, and reviews
- File upload with Multer and Firebase
- Pagination, sorting, and filtering
- Error handling and validation

## Installation

To run this project locally, you need to have Node.js, nodemon, MongoDB, and npm installed on your machine.

1. Clone this repository: `git clone https://github.com/Luan-Costa-2l/lcStore-API.git`

```bash
  # Clone this repository
  $ git clone https://github.com/Luan-Costa-2l/lcstore
```

2. Navigate to the project folder: `cd lcStore-API`

```bash
  # Open the directory
  $ cd lcstore
```

3. Install the dependencies: `npm install`

```bash
  # Install the dependecies
  $ npm install
```

4. Create a `.env` file in the root directory and add the following variables:

```bash
  PORT=5000
  NODE_DATABASE=your_mongodb_connection_string

  # Firebase authentication
  NODE_API_KEY=your_firebase_api_key
  NODE_AUTH_DOMAIN=your_firebase_auth_domain
  NODE_PROJECT_ID=your_firebase_project_id
  NODE_STORAGE_BUCKET=your_firebase_storage_bucket
  NODE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  NODE_APP_ID=your_firebase_app_id
```

5. Run the server: `npm run dev`

```bash
  # Run the server
  $ npm run dev
```

6. Use a tool like Postman or Insomnia to test the endpoints.

## Documentation

soon...

## License

This project is licensed under the MIT License. See the [LICENSE](^2^) file for details.
