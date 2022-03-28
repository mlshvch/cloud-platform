# frozen_string_literal: true

module Types
  # MutationType class
  class MutationType < Types::BaseObject
    field :sign_up, mutation: Mutations::SignUpUser
  end
end
