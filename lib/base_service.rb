# frozen_string_literal: true
require 'docker'
require 'fileutils'

module BaseService
	extend ActiveModel::Naming

	private

	def _create_record
		super if create_service
	end

	def create_service
		directory = "#{Rails.root}/services/demo/#{self.model_name.singular}"
		dockerfile = "#{Rails.root}/lib/dockerfiles/Dockerfile.#{self.model_name.name}"
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
		else
			raise LoadError
		end
	end
end