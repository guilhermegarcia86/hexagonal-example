# Hexagonal Architecture Example

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hexagonal_Architecture.svg/313px-Hexagonal_Architecture.svg.png)

This an example using Hexagonal Architecture using Typescript and NodeJS.

It's used **Express**, **Fastify** and **TypeORM** on the edge layer.

Is recommended to have the Docker and Docker-Compose installed.

## Run

Before all if you have **Docker** and **Docker-Compose** you may run:

```bash
docker-compose up -d
```

Install all dependencies
```bash
npm i
```

To run using Express
```bash
npm run start:express
```

To run using Fastify
```bash
npm run start:fastify
```

## Test

To run the tests

```bash
npm run test
```
