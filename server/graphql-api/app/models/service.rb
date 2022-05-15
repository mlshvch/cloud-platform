# frozen_string_literal: true

class Service < ApplicationRecord
  include AASM
  belongs_to :user
  belongs_to :serviceable, polymorphic: true

  enum state: %i[:running :stopped]

end
