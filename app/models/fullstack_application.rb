# frozen_string_literal: true

require 'base_service'

class FullstackApplication < ApplicationRecord
  include BaseService
  has_one :service, as: :serviceable

end
