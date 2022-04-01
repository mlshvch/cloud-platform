# frozen_string_literal: true

module Mutations
  class SignOutUser < GraphqlDevise::Mutations::Logout
    field :status, String, null: false

    def resolve
      super.merge(status: '200'.to_json)
    end
  end
end
