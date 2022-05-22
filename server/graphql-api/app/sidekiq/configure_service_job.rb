# frozen_string_literal: true

require 'fullstack_application_service'

class ConfigureServiceJob
  include Sidekiq::Job
  include FullstackApplicationService

  # TODO REWRITE INSTANCE VARIABLES TO PARAMS_DATA ARRAY

  def perform(params)
    change_state('preparing')
    prepare_data(params)
    pull
    create_images
    connect_database if params['database']
    create_service
    delete_redis_record
  end

  private

  def pull
    change_state('pulling')
    root = "#{Rails.root}/user_services"
    @dir = "#{root}/#{user_to_hex}"
    dir_name = @app.source.split('/')[-1].split('.')[0]
    FileUtils.mkdir(@dir) unless Dir.exist?(@dir)
    FileUtils.cd(@dir)
    @dir = "#{@dir}/#{dir_name}"
    return if Dir.exist?(@dir)

    Git.clone(@app.source, @dir)
  end

  def create_images
    change_state('creating_images')
    @app.create_dockerfile('Rails', "#{@dir}")
    @app.image_id = create_image("#{@dir}", @name)
  end

  def connect_database
    change_state('connecting_database')
    sleep 30
  end

  def create_service
    change_state('creating_service')
    parse_yaml(user_to_hex[0..10], @dir, @name, @database)
    pp "#{@dir}/pod.yml"
    `kubectl apply -f #{@dir}/pod.yml` && print("POD STARTED")
  end

  def user_to_hex
    Digest::SHA2.hexdigest @service.user_id.to_s
  end

  def change_state(state)
    Redis.new.set("sidekiq_job_#{jid}", state)
  end

  def delete_redis_record
    Redis.new.del("sidekiq_job_#{jid}")
  end

  def save_data
    @app = @app.save!
    @service.serviceable = @app
    @service.save!
  end

  def prepare_data(params)
    @app = FullstackApplication.new
    @service = Service.new
    @service.user = User.find_by(id: params['uid'])
    @app.source = params['repo']
    @name = params['name']
    @service.name = @name
    @database = params['database']
  end

end
