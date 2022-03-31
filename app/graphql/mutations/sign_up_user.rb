# frozen_string_literal: true

module Mutations
  class SignUpUser < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true
    argument :email, String, required: true
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :username, String, required: false
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    type Types::UserType
    
    def resolve(**params)
      sign_up_user(params)
    end

    private

    def sign_up_user(params)
      User.create!(params)
    end
  end
end
