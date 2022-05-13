# frozen_string_literal: true

module Types
  # MutationType class
  class MutationType < Types::BaseObject
    field :create_service, mutation: Mutations::CreateService
    field :create, mutation: Mutations::Create
    field :sign_out_user, mutation: Mutations::SignOutUser
    field :login, mutation: Mutations::SignInUser
    field :sign_up, mutation: Mutations::SignUpUser
  end
end
