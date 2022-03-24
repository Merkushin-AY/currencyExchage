# currencyExchange

## Run with docker
```bash
docker build -t nuxt-app .
docker run -d -it --name currencyExchange -v ${PWD}:/app -p 3030:3000 nuxt-app npm run install:dev
```

## Build Setup
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```