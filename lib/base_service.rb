# frozen_string_literal: true
require 'docker'

module BaseService
	extend ActiveModel::Naming

	private

	def _create_record
		super if create_service
	end

	def create_service(dockerfile: "#{Rails.root}/lib/dockerfiles/Dockerfile.#{self.model_name.name}", directory: "#{Rails.root}/services/demo/#{self .model_name.singular}")

		`docker build -f #{dockerfile} #{directory}`.split(" ").last
		# next implementation with docker_api throws ocker::Error::ServerError: {"message":"Cannot locate specified Dockerfile: ...}

		# if File.directory?(directory)
		# 	Docker::Image.build_from_dir(
		# 		directory,
		# 		{ 'dockerfile' => dockerfile }
		# 	) do |v|
		# 		if (log = JSON.parse(v)) && log.has_key?("stream")
		# 			$stdout.puts log["stream"]
		# 		end
		# 	end
		# else
		# 	raise LoadError
		# end
	end
end