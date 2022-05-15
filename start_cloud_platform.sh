docker start redis &
minikube start &
docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000" &
kubectl proxy --port 8080 &
cd server/graphql-api && bundle exec sidekiq &
bundle exec rails s &
