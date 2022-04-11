# frozen_string_literal: true

require 'base_service'
require 'aasm'

class FullstackApplication < ApplicationRecord
  include BaseService
  include AASM
  has_one :service, as: :serviceable

  enum state: %i[configuring sleeping starting running]

  aasm timestamps: true, enum: true, column: :state do
    state :configuring, initial: true
    state :sleeping, :starting, :running

    event :start do
      transitions from: :configuring,
                  to: :sleeping,
                  guards: :configuring_needed?,
                  success: proc { pp 'sleeping' }

      transitions from: :sleeping,
                  to: :starting,
                  guards: :configured?,
                  success: proc { pp 'starting' }


      transitions from: :starting,
                  to: :running

    end

    event :stop do
      transitions from: :running,
                  to: :sleeping
    end
  end

  private

    def configuring_needed?
      true
    end

    def configured?
      true
    end


end
