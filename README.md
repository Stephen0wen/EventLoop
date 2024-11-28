# EventLoop

---

## Back End

This is a RESTful API which serves the necessary data for the EventLoop platform in JSON format.

Link to hosted version: `https://eventloop.onrender.com`

Make a GET request to the /api endpoint to see a list of endpoints with example responses

### Auth Header

For endpoints with paths starting with `/api/user` or `/api/staff` a JWT from firebase on an `"auth"` header. In order to obtain these tokens for testing purposes, the `/back-end/utils/getToken.js` file can be used, but please note that a `.env.firebase.json` file containing the firebase api key and configuration must be created in the `/back-end` directory for this to work.

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
echo "PGDATABASE=enet_dev" >> .env.development
echo "PGDATABASE=event_test" >> .env.test
```

It will then be possible to create local databases by running the setup-dbs script (which runs the setup.sql file) using the following command:

```
npm run setup-dbs
```

---

### Running Integration Tests

Integration tests can be run using the following command:

```
npm test
```

The tests can be seen in the be-nc-news/\_\_tests\_\_/app.test.js file. Tests can be run individually by inserting ".only" after the relevent test function (and then running the file using the command above):

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

### Listening

To start listening, the following command can be used to run the listen.js file:

```
npm start
```

Requests can then be made to the server using insomnia/postman etc.

---

## Requirements

node.js version 21.6.1  
Postgres version 14.11
