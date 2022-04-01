class Service < ApplicationRecord
  belongs_to :user
  belongs_to :serviceable, polymorphic: true
end
