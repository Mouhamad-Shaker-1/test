# back end

1- make your database in mongoDB
2- create secret for JWT 
3- make .env file

```sh
MONGO_URL="mongodb key"
JWT_SECRET="your secret"
EXPIRES_IN="30d (after 30d the jwt become expired)"
```

install packages

```sh
    cd back-end
    npm install
```

run the server 

```sh 
    nodemon server.js
```

note: the server will be on port 4000
you can add in the .env the port you want

```sh 
    PORT=""
```

# Font end

1- add the back end url in .env.local file

```sh 
    NEXT_PUBLIC_API_URL='(your url in back end)/api/v1'
```

install packages

```sh
    cd client
    npm install
```

run the project

```sh 
    npm run dev
```