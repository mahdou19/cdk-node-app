   ssh -o StrictHostKeyChecking=no -i private_key ${USER_NAME}@${HOSTNAME} '
            export TAG="'"$TAG"'"
            export DOCKER_IMAGE_NAME="'"$DOCKER_IMAGE_NAME"'"
            export DOCKER_USERNAME="'"$DOCKER_USERNAME"'"
            sudo docker run --rm -p 80:80 -d $DOCKER_USERNAME/$DOCKER_IMAGE_NAME:$TAG
          '