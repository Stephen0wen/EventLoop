# EventLoop

Welcome to EventLoop

This is a React application which allows users to browse and sign up for events. Users can sign in using google or email/password and then sign up for events and add them to their google calendars. Users with staff account privileges can manage and create events.

Link to the deployed site: `https://event-loop.netlify.app/`

Link to video demonstration: `https://youtu.be/mwRPxg00CyY`

---

### Test User Credentials

There are two tiers of users with different priviliges. Regular users can view, sign up for, and add events to their google calendars, while staff users can also create, edit and delete events.

Below are some credentials that can be used for testing the application. Please note that it is not possible to delete these accounts via the front end, so if you want to test this functionality, you will need to create another account first.

```
Public Accounts:

public@dev.com
public2@dev.com
public3@dev.com
```

```
Staff Accounts:

staff@dev.com
staff2@dev.com
staff3@dev.com
```

The passwords for all these accounts are `12345678`

---

---

# Back End

This is a RESTful API which serves the necessary data for the EventLoop platform in JSON format.

Link to hosted version: `https://eventloop.onrender.com`

Make a GET request to the /api endpoint to see a list of endpoints with example responses. Please note, endpoints with paths starting with `/api/user` or `/api/staff` require a JWT from firebase on an `"auth"` header.

---

### Local Setup Instructions

To run the project locally, the git repository must first be cloned. After ensuring that git is installed, navigate to the directory in which you wish to create the local version and then run the following command:

```
git clone https://github.com/Stephen0wen/EventLoop.git
```

You must then navigate into the repo and install any missing dependencies using the following commands:

```
cd back-end
npm install
```

It is then necessary to create .env files containing the database names (in the same directory). Below are some commands you can run to create these for you:

```
echo "PGDATABASE=event_dev" >> .env.development
echo "PGDATABASE=event_test" >> .env.test
```

It will then be possible to create local databases by running the setup-dbs script (which runs the setup.sql file) using the following command:

```
npm run setup-dbs
```

For protected endpoints to function, a `.env.firebase.json` file must be created in the `/back-end` directory. Skipping this step will make it impossible to use any of the protected endpoints and will also cause many integration tests to fail. This file should contain the Firebase Admin SDK private key which can be obtained from the firebase console. An additional key needs to be added to the object to store the API key, which can also be seen on the firebase console. The file should contain an object with all the following keys (and be populated with values):

```
{
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": "",
    "universe_domain": "",
    "api_key": ""
}
```

---

### Running Integration Tests

Integration tests can be run using the following command:

```
npm test
```

The tests can be seen in the `be-nc-news/__tests__/app.test.js` file. Tests can be run individually by inserting ".only" after the relevent test function (and then running the file using the command above):

```
test.only("GET:200...", () => {
    ...
})
```

Similarly, all the tests for a given endpoint can be run by inserting ".only" after the relevent "describe" function:

```
describe.only("/path/you/wish/to/test", () => {
    tests...
})
```

In the same way, test/describe blocks can be skipped by inserting ".skip" instead of ".only" in the same positions detailed above.

---

### Seeding Development Database

The development database can be seeded by running the seed script using the following command:

```
npm run seed
```

---

### Seeding Production Database

In order to seed a production database, a `.env.production` file is required in the `/backend` directory of the project. This file should contain the following:

```
DATABASE_URL = <Your Production Database URL>
```

The following command can then be used to seed the production database:

```
npm run seed-prod
```

---

### Listening

To start listening, the following command can be used to run the listen.js file:

```
npm start
```

Requests can then be made to the server by the front-end application or using insomnia/postman etc.

---

---

# Front End

### Local Setup Instructions

If you have not already done so, you must clone the git repository using the following command:

```
git clone https://github.com/Stephen0wen/EventLoop.git
```

You can then navigate into the front-end directory and install dependencies:

```
cd front-end
npm install
```

The application can then be run locally by running the following script:

```
npm run dev
```

This will then allow you to open the application on your browser.

---

### Connecting to Locally Hosted Back-End

By default, the application will make API requests to the hosted version of the back-end. If you wish to locally host the back-end with a development database, the /front-end/Src/apiRequests.js file must be altered. The code on line 3 where the `baseURL` variable is created need to be changed to the following:

```
const baseURL = "http://localhost:9090"
```

Once this has been completed, in two separate terminal windows, you can then run the front-end application and start listening with the back-end as detailed in previous sections.

---

### Creating a Build

To create a build in order to deploy the front-end application, simply run the following script:

```
npm run build
```

The build files will then be created/updated in the `/front-end/dist` directory.

---

## Requirements

node.js version 21.6.1  
Postgres version 14.11
