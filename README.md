# DataVerse (Frontend & Backend)

## Description

## Setup Instructions - DEVELOPMENT ENV

#### Backend (NodeJS with TypeScript)

To set up the backend service on your local machine, follow the following steps:

1. Clone the repo depending on your preferred method:
   - HTTPS: `git clone https://github.com/david-commit/dataverse-be.git`
   - SSH: `git clone git@github.com:david-commit/dataverse-be.git`
2. Run the following snippet to change directory, install node modules and open the project within VS Code.
   Incase of an error, check your internet connection and/or make sure you have VS Code installed.

   `cd dataverse-be && touch .env && npm install && code .`

3. Next, open the `.env` located in the root of the application and add the following details:
   <ol type="i">
    <li>PORT variable eg <code>PORT=2030</code></li>
    <li>DATABASE_URL variable which must be <code>DATABASE_URL='file:./dev.db'</code></li>
    <li>SECRET variable eg <code>SECRET=ilovechapobeans</code></li>
    <li>FRONTEND_URL variable eg <code>FRONTEND_URL=http://localhost:5174</code>(vite development link)</li>
    <li>NODE_ENV variable eg <code>NODE_ENV=production</code> or <code>NODE_ENV=development</code></li>
   <h4>Optional Variables</h4>
    <li><code>EMAIL=example@gmail.com</code></li>
    <li><code>EMAIL_PASSWORD=xxxx xxxx xxxx xxxx</code></li>
    The EMAIL and EMAIL_PASSWORD are necessary if you want to utilize the mailing module such as the reset password and contact form features
   </ol>
4. After the variables are loaded, run: `npx prisma db push` to build the database from the schema.
5. Next, run: `npx prisma db seed` to seed the database.
6. Run `npm run dev` to start the server

#### Frontend (ReactJS with JavaScript)

To set up the backend service on your local machine, follow the following steps:

1. Clone the repo depending on your preferred method:
   - HTTPS: `git clone https://github.com/david-commit/dataverse-fe.git`
   - SSH: `git clone git@github.com:david-commit/dataverse-fe.git`
2. Run the following snippet to change directory, install node modules and open the project within VS Code.
   Incase of an error, check your internet connection and/or make sure you have VS Code installed.

   `cd dataverse-fe && npm install && code .`

## Deloyment Instructions - PRODUCTION ENV

Instructions to be provided

## Design

Figma will be used to design the frames to represent the website. Links below:

- [Edit mode](https://www.figma.com/file/NN2scaWfPt9yefajzQWTXw/DataVerseKE?type=design&node-id=0%3A1&mode=design&t=idrwN6e2rLwwZvLi-1)
- [Presentation Mode](https://www.figma.com/proto/NN2scaWfPt9yefajzQWTXw/DataVerseKE?type=design&node-id=0-1&t=idrwN6e2rLwwZvLi-0&scaling=min-zoom&page-id=0%3A1)

## API Documentation

The documentation will be cateorized into respective models. The backend of this application is built primarily in Node and ExpressJS for the server. These are some of the available routes:

### AUTHENTICATION

1. ADMIN LOGIN

   POST: `/api/admin-login`

   Request:

   ```json
   {
     "email": "walter@brown.com",
     "password": "Password"
   }
   ```

   Response:

   ```json
   {
     "id": 5,
     "name": "Walter Brown",
     "email": "walter@brown.com",
     "phone": "0112345678"
   }
   ```

2. VERIFY TOKEN

   POST: `/api/auth/me`

   Request:

   - Access token provded via the request headers

   Response if valid token is provided:

   ```json
   {
     "msg": "Authorized"
   }
   ```

   Response if invalid or no token is provided:

   ```json
   {
     "msg": "Authentication failed: No token provided"
   }
   ```

3. ADMIN LOGOUT

   POST: `/api/admin-logout`

   Request:

   - Access token provded via the request headers

   Response:

   ```json
   {
     "msg": "Logged out successfully"
   }
   ```

### ADMINS

1. GET ALL ADMINS (Authenticated)

   GET: `/api/get-admins`

   - A valid token must be provided

   Response:

   ```json
   [
     {
       "id": 1,
       "name": "Faith Brown",
       "email": "faith@example.com",
       "phone": "0712345678"
     },
     {
       "id": 2,
       "name": "Lynette White",
       "email": "lynette@example.com",
       "phone": "0712345678"
     }
   ]
   ```

2. GET SINGLE ADMIN (Authenticated)

   GET: `/api/get-admins/:adminID`

   - A valid token must be provided

   Response:

   ```json
   {
     "id": 5,
     "email": "walter@brown.com",
     "phone": "0112345678"
   }
   ```

3. CREATE NEW ADMIN

   POST: `/api/create-admin`

   Request:

   ```json
   {
     "name": "Walter Brown",
     "email": "walterrr@brown.com",
     "password": "Password",
     "phone": "0712345678"
   }
   ```

   Response:

   ```json
   {
     "id": 7,
     "name": "Walter Brown",
     "email": "walterrr@brown.com",
     "phone": "0712345678"
   }
   ```

4. UPDATE AN EXISTING ADMIN

   PATCH: `/api/update-admin/:adminID`

   Request:

   - A valid token must be provided via the request headers
   - An email must be provided via the request body and cannot be changed

   ```json
   {
     "email": "walterr@brown.com",
     "phone": "0112345678"
   }
   ```

   Response:

   ```json
   {
     "id": 7,
     "name": "Walter Brown",
     "email": "walterr@brown.com",
     "phone": "0112345678"
   }
   ```

5. DELETE AN EXISTING ADMIN

   POST: `/api/delete-admin/:adminID`

   Request:

   - A valid token must be provided via the request headers

   Response:

   - 204 No Content status code


# TODO:
- Add published boolean status to job posts
- Add application deadline, modified date
