# NodeJs JWT Authentication API

## Sumary
- [About](#about)
- [Root features](#root-features)
- [Features](#features)
    - [Root features](#root-features)
    - [Additional features](#additional-features)
- [Tech stacks](#tech-stacks)
- [Run app](#run-app)
    - [Development environment](#development-environment)
        - [Step 1 - Run docker compose](#step-1)
        - [Step 2 - Setting environment variables](#step-2)
        - [Step 3 - Run the App](#step-3)
    - [Production environment](#production-environment)

## <a name="about"></a> About
- Repository to JWT Authentication API
- Tutorial: https://youtu.be/qEBoZ8lJR3k

## <a name="features"></a> Features

### <a name="root-features"></a> Root features
- Api with ExpressJs and MongoDB
- Have public and private endpoints
- The private endpoints need the token to be accessed
- The token is delivered through successful login
- We need send the token by the request header
- A middleware validates if the token is valid or not
- There is no session persistence in the back-end, everything is done by the token

### <a name="additional-features"></a> Additional features
- Run mongoDB in docker
- Docker compose to setup database
    - Tutorial: https://youtu.be/DbKPeaVHwdE
    - Reference: https://hub.docker.com/_/mongo
- Using **mongo-express** to show MongoDB interface
- Documentation with Swagger
- Deploy in Heroku
- **Dev** and **Prod** environments

## <a name="tech-stacks"></a> Tech stacks
- NodeJs
- ExpressJs
- Data
- MongoDB 
- Docker

## <a name="run-app"></a> Run app 

### <a name="development-environment"></a> Development environment

#### <a name="step-1"></a> Step 1 - Run docker compose
- In the first step is necessary execute the **docker-compose**
- Docker is responsible for creating a container to run the database, the mongoDB, locally
- The file `docker-compose.yml` is responsible for downloading the **mongoDB** and **mongo express** image and configurate the respective containers
- *Notes*:
    - The command `docker-compose up` is necessary to run at first time. At other times it's only necessary to run the container
    - To connect at first time with the mongoDB is necessary to authenticate. The step-by-step is:
        - Open mongoDB in cmd
        - Run the command: `mongo`
        - Run the command to access the admin: `use admin`
        - Run the command to set password (root is the username configured in the docker compose): `db.auth('root', passwordPrompt())`
        - Write the password (configured in the docker compose): `example`

At firs time:
```
docker-compose up
```

At other times:
```
docker start [container-id] or [container-name]
```

#### <a name="step-2"></a> Step 2 - Setting environment variables
- The `.env` file is responsible to set the environment variables of application
- Rename the file `.env.example` to `.env` (or create a `.env` file) and fill in the blanks with your values

#### <a name="step-3"></a> Step 3 - Run the App

```
npm run dev
```

### <a name="production-environment"></a> Production environment

- Link: https://node-api-jwt-authentication.herokuapp.com
- The application is hosted on [heroku](https://dashboard.heroku.com)
- The mongoDB is hostend on [MongoDB Atlas](https://www.mongodb.com/atlas/database) 