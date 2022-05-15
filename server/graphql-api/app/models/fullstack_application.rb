# frozen_string_literal: true

require 'fullstack_application_service'

class FullstackApplication < ApplicationRecord
  include FullstackApplicationService
  has_many :services, as: :serviceable
end
