mongodb-sample-db-gen
=====================

Sample database generator for mongodb. Generates a json file of a 'person' collection given a list of first names and last names to use and associated bank account data.

Each person gets a random number of bankaccounts with a minumum of 1 account to a max of 9. Each account has a random currency type, balance and account type.

Super simple to run:
```bash
npm install
node app.js
```

Change the number of first and last names (inside [firstnames.txt](./firstnames.txt) and [lastnames.txt](./lastnames.txt])) to increase or decrease the side of the output database json file. You can make a very large json database by increasing the names (grows at firstname * lastname rate).

Load this json file with the ![mongoimport](http://docs.mongodb.org/manual/reference/program/mongoimport/) tool that comes with the mongodb installation.

