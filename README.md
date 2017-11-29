# How to run

## local
```
npm Install
npm run build
npm start
```

## with docker
```
# build the images
docker build -t jakal-exchange .

# create network
docker network create gold-net

# run containers
docker run -d --name mongo-bongo --network="gold-net" mongo
docker run -d --name jakal-app --network="gold-net" -p 9000:8085 jakal-exchange
```
