docker start redis &
minikube start &
kubectl proxy --port 8080 &
cd server/graphql-api && bundle exec sidekiq &
bundle exec rails s &
