# frozen_string_literal: true

require 'fullstack_application_service'
require 'k8s'
require 'aasm'

class FullstackApplication < ApplicationRecord
  include FullstackApplicationService
  include K8s
  include AASM
  has_one :service, as: :serviceable

  aasm timestamps: true, enum: true, column: :state do
    state :sleeping, initial: true
    state :running

    event :start do
      transitions from: :sleeping,
                  to: :starting
    end

    event :stop do
      transitions from: :running,
                  to: :sleeping
    end
  end
end
