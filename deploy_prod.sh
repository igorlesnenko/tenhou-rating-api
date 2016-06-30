docker login -p $DOCKER_PASSWORD
docker tag tenhou:api $DOCKER_ID_USER/tenhou:api
docker push $DOCKER_ID_USER/tenhou:api