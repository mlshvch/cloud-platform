# frozen_string_literal: true

class ConfigureServiceJob
	include Sidekiq::Job

	def perform(params)
		change_state('')
		@uid = params['uid'].to_s
		@repo = params['repo']
		pull
		create_images
		create_containers
		connect_database if params['database']
		create_service
		delete_redis_record
	end

	private

	def pull
		change_state('pulling')
		root = "#{Rails.root}/user_services"
		@dir = "#{root}/#{user_to_hex}"
		FileUtils.mkdir(@dir) unless Dir.exist?(@dir)
		FileUtils.cd(@dir)
		`git clone #{@repo}`
	end

	def create_images
		change_state('creating_images')

	end

	def create_containers
		change_state('creating_containers')
		sleep 30
		show_status
	end

	def connect_database
		change_state('connecting_database')
		sleep 30
		show_status
	end

	def create_service
		change_state('creating_service')
		sleep 30
	end

	def user_to_hex
		Digest::SHA2.hexdigest @uid
	end

	def change_state(state)
		Redis.new.set("sidekiq_job_#{jid}", state)
	end

	def delete_redis_record
		Redis.new.del("sidekiq_job_#{jid}")
	end



end
