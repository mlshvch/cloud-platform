Rails.application.routes.draw do
  mount_graphql_devise_for(User, at: '/api/v1/graphql_auth', operations: {
    sign_up: Mutations::SignUpUser,
    # sign_in: Mutations::SignInUser,
  })

  get '/api/v1/graphql', to: 'api/v1/graphql#graphql'
  post '/api/v1/graphql', to: 'api/v1/graphql#graphql'
  post '/api/v1/interpreter', to: 'api/v1/graphql#interpreter'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
