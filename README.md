![alt text](./img/logo.png "On Wax Logo")

# On Wax

On wax is a platform for record collectors, enthusiasts and traders to share their collections, buy and sell, or just find information about those rare or forgotten gems.

This is a personal side project built with Node, Express, PostgreSQL and Nuxt; However, contributions are welcome. If you feel you have something to add to the project, please feel free to submit a PR.

## Local Dev Configuration

In order to run the project locally, you will need to ensure you have a PostgreSQL database running and have cloned the repository to your machine.

Once the previous step has been completed, install the project dependencies.

```
npm install
```

If you are having problems at this stage, please make sure you have pulled in the dev dependencies by setting the NODE_ENV equal to development in your config.

You will also need to set an environment variable for RECORD_COLLECTION_DB_CONN which will be equal to a PostgreSQL connection string with the format

```
"postgres://<DB_USERNAME>@<HOST>:<DB_SERVER_PORT>/<DB_NAME>"
```

Further details about connection strings can be found in the [Sequelize docs](https://sequelize.org/master/manual/getting-started.html).

You should now be able to run the project which will scaffold the Database tables if you have correctly configured the connection.

```
npm run dev
```

Note: As this project is very much a work in progress, the database tables are scaffolded on project start in _server.js_; However, as the project progresses, I plan to use the Sequelize CLI and migrations to manage changes to the Database.

## UPDATE: FEB 2021

The project now uses sequelize-cli for managing migrations. Docs for how to use the CLI can be found [here](https://sequelize.org/master/manual/migrations.html#migration-skeleton).
