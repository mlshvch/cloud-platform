Rails.application.routes.draw do
  mount_graphql_devise_for(
    User,
    at: 'api/v1/graphql_auth',
    authenticatable_type: Types::UserType,
    operations: {
      login: Mutations::SignInUser
    })


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
