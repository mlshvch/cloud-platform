require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  mount_graphql_devise_for(
    User,
    at: 'api/v1/graphql_auth',
    authenticatable_type: Types::UserType,
    operations: {
      login: Mutations::SignInUser,
      register: Mutations::SignUpUser,
      logout: Mutations::SignOutUser
    }
  )

  post '/api/v1/graphql', to: 'graphql#execute'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
