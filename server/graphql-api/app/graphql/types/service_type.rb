# frozen_string_literal: true

module Types
  class ServiceType < Types::BaseObject
    field :id, Integer
    field :technology, String
    field :name, String
    field :endpoint, String
    field :state, String
    field :access, String
    field :serviceable_type, String
  end
end
