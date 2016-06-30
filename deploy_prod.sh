#!/usr/bin/env bash

docker login -p $DOCKER_PASSWORD -u $DOCKER_ID_USER
docker tag tenhou:api $DOCKER_ID_USER/tenhou:api
docker push $DOCKER_ID_USER/tenhou:api