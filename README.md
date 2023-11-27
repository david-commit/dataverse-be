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
    <li>PORT variable eg <code>PORT=2030</code><li>
    <li>DATABASE_URL variable which must be <code>DATABASE_URL='file:./dev.db'</code><li>
    <li>SECRET variable eg <code>SECRET=ilovechapobeans</code><li>
   </ol>
4. After the variables are loaded, run: `npx prisma db push` to build the database from the schema.
5. Next, run: `npx prisma db seed` to seed the database.
6. Run `npm run dev`to start the server

#### Frontend (ReactJS with JavaScript)

To set up the backend service on your local machine, follow the following steps:

1. Clone the repo depending on your preferred method:
   - HTTPS: `git clone https://github.com/david-commit/dataverse-fe.git`
   - SSH: `git clone git@github.com:david-commit/dataverse-fe.git`
2. Run the following snippet to change directory, install node modules and open the project within VS Code.
   Incase of an error, check your internet connection and/or make sure you have VS Code installed.

   `cd dataverse-fe && npm install && code .`