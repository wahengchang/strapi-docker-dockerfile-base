## Init

#### Step -1 
init strapi server with:
```
docker run -it -p 1337:1337 --env-file env_file -v `pwd`/project-name:/srv/app strapi/strapi
```

#### Step -2
change it as config by env `./project-name/config/database.js`
```js
//./project-name/config/database.js 
const {DATABASE_NAME, DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD} = process.env
const uri = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`

console.log('DATABASE_NAME: ', DATABASE_NAME)
console.log('DATABASE_HOST: ', DATABASE_HOST)
console.log('DATABASE_PORT: ', DATABASE_PORT)
console.log('DATABASE_USERNAME: ', DATABASE_USERNAME)
console.log('DATABASE_PASSWORD: ', DATABASE_PASSWORD)
console.log('uri: ', uri)

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      "settings": {
        "client": "mongo",
        "uri": uri,
        "port": DATABASE_PORT,
        "database": DATABASE_NAME
      },
    },
  },
});
```

#### Step -3
To build a docker image with :
```
$ docker build --tag strapi-project:1.0 .
$ docker images
```

## Run
make sure that you have `env_file`
```
$ docker run --publish 1337:1337 --env-file env_file --name strapi-project-run strapi-project:1.0 
```


```
docker run -it \
    -e DATABASE_CLIENT=mongo \
    -e DATABASE_NAME=$DATABASE_NAME \ 
    -e DATABASE_HOST=$DATABASE_HOST \
    -e DATABASE_PORT=$DATABASE_PORT \
    -e DATABASE_USERNAME=$DATABASE_USERNAME \
    -e DATABASE_PASSWORD=$DATABASE_PASSWORD \
    -e MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME \
    -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD \
    -p 1337:1337 \
    -v `pwd`/project-name:/srv/app \
  strapi/strapi
```


## Note:
```
$ docker container prune
```