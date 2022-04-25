# frozen_string_literal: true

class FullstackApplication < ApplicationRecord
  has_one :service, as: :serviceable

end
