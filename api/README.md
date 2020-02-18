[![Build Status](https://travis-ci.com/kayroncabral/mee.svg?token=ibFoUs4Eey7Bsz93pLds&branch=master)](https://travis-ci.com/kayroncabral/mee)

# Mee

A POS app for small grocery stores.

### Run backend

`npm start`

### Run backend tests

`npm test`

### Run frontend

`cd app`

`npm start`

### Run frontend tests

`cd app`

`npm test`

### Migrations

https://www.npmjs.com/package/migrate-mongo

```
# create migration
docker exec mee_api_1 npx migrate-mongo create your-migration-title-here

# check migrations status
docker exec mee_api_1 npx migrate-mongo status

# apply pending migrations
docker exec mee_api_1 npx migrate-mongo up

# revert the last applied migration
docker exec mee_api_1 npx migrate-mongo down

# !MOST IMPORTANTS FOR TESTING! run migrate inside docker
docker exec mee_api_1 npm run migrate:up

docker exec mee_api_1 npm run migrate:down

```

### Seeds

Update seeds from local database

```
npm run seed:update
```

Populate database with seed

```
npm run seed
```
