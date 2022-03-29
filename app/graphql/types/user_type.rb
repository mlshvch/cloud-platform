# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    description 'Service User'
    field :id, Integer, null: false
    field :email, String, null: false
    field :first_name, String, null: false
    field :last_name, String, null: false
    field :username, String, null: true
    field :password, String, null: false
    field :confirm_password, String, null: false
    field :tokens, String
  end
end
