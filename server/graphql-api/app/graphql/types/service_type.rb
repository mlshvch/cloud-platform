# frozen_string_literal: true

module Types
  class ServiceType < Types::BaseObject
    field :name, String
    field :endpoint, String
    field :state, Integer
    field :access, Integer
    field :serviceable_type, String
  end
end
