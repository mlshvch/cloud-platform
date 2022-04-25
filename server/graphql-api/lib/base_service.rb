# frozen_string_literal: true
require 'docker'
require 'fileutils'

module BaseService
	extend ActiveModel::Naming

	def create_fullstack_app_image(directory, dockerfile)
		# directory = "#{Rails.root}/services/demo/#{self.model_name.singular}"
		# dockerfile = "#{Rails.root}/lib/dockerfiles/Dockerfile.#{self.model_name.name}"
		FileUtils.cp(dockerfile, directory)

		if File.directory?(directory)
			Docker::Image.build_from_dir(
				directory,
				{ 'dockerfile' => "Dockerfile.#{self.model_name.name}" }
			) do |v|
				if (log = JSON.parse(v)) && log.has_key?("stream")
					$stdout.puts log["stream"]
				end
			end
			self.image
		else
			raise LoadError
		end
	end

	def create_container

	end

end