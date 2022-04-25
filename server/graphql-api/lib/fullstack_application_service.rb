module FullstackApplicationService
	def create_image(directory: nil, dockerfile: nil)
		directory = "#{Rails.root}/services/demo/#{self.model_name.singular}"
		dockerfile = "#{Rails.root}/lib/dockerfiles/Dockerfile.#{self.model_name.name}"
		FileUtils.cp(dockerfile, directory)
		FileUtils.mv("#{directory}/Dockerfile.#{self.model_name.name}", "#{directory}/Dockerfile")
		if File.directory?(directory)
			image = Docker::Image.build_from_dir(directory)
			self.image_id = image.id
			self.save!
		else
			raise LoadError
		end
	end

	def create_container
		image = Docker::Image.get(self.image_id)
		if image
			container = Docker::Container.create(
				'Cmd' => ['ls'],
				'Image' => image.id
			)
			self.container_id = container.id
			self.save!
		end
	end

end
