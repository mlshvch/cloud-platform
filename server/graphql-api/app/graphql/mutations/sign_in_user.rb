# frozen_string_literal: true

module Mutations
  class SignInUser < GraphqlDevise::Mutations::Login
    field :user, Types::UserType

    def resolve(email:, password:)
      super.merge(user: context[:current_resource])
    end
  end
end
