# frozen_string_literal: true

class Service < ApplicationRecord
  belongs_to :user
  belongs_to :serviceable, polymorphic: true
end
