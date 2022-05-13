# frozen_string_literal: true

require 'aasm'
require 'fileutils'
require 'git'
# Background job to configure Service
class ConfigureServiceJob
  include Sidekiq::Job
  include AASM

  aasm do
    state :pulling, initial: true
    state :creating_images, before_enter: :pull_code
    state :creating_containers, before_enter: :create_service_images
    state :setting_up_database, before_enter: :connect_database
    state :creating_service, before_enter: :deploy_service

    event :pull do
      transitions to: :creating_images
    end

    event :create_images do
      transitions to: :creating_containers
    end

    event :set_up_database do
      transitions to: :setting_up_database
    end

    event :create_service do
      transitions from: %i[setting_up_database creating_containers], to: :creating_service
    end
  end

  def perform(params)
    @uid = params['uid'].to_s
    @repo = params['repo']
    pull
    create_images
  end

  def pull_code
	  root = "#{Rails.root}/user_services"
	  @dir = "#{root}/#{user_to_hex}"
	  FileUtils.mkdir(@dir) unless Dir.exist?(@dir)
	  FileUtils.cd(@dir)
	  `git clone #{@repo}`
  end

  def create_service_images
	  pp '1'
	  sleep 2
  end

  def user_to_hex
	  Digest::SHA2.hexdigest @uid
  end

end
