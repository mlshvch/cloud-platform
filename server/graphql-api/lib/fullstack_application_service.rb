module FullstackApplicationService
  def create_dockerfile(technology, directory)
    dockerfile = "#{technology}.#{self.model_name.name}"
    FileUtils.cp("#{Rails.root}/lib/dockerfiles/#{dockerfile}", directory)
    FileUtils.mv("#{directory}/#{dockerfile}", "#{directory}/Dockerfile")
  end

  def create_image(directory, name)
    return if Docker::Image.exist?("localhost:5000/#{name}:latest")

    image = Docker::Image.build_from_dir(directory)
    image.tag('repo' => "localhost:5000/#{name}", 'tag' => 'latest', force: true)
    image.push
    image
  end

  def parse_yaml(username, directory, name, database_required)
    yaml = YAML.load_file("#{Rails.root}/../../k8s/pod.yaml")
    yaml['items'][0]['metadata']['name'] = "#{name}-deployment"
    yaml['items'][0]['metadata']['labels']['app'] = "#{username}-#{name}"
    yaml['items'][0]['spec']['selector']['matchLabels']['app'] = "#{username}-#{name}"
    yaml['items'][0]['spec']['template']['metadata']['labels']['app'] = "#{username}-#{name}"
    yaml['items'][0]['spec']['template']['metadata']['name'] = "#{username}-#{name}"
    yaml['items'][0]['spec']['template']['spec']['containers'][0]['name'] = "#{username}-#{name}"
    yaml['items'][0]['spec']['template']['spec']['containers'][0]['image'] = "localhost:5000/#{name}"
    yaml['items'][0]['spec']['selector']['matchLabels']['app'] = "#{username}-#{name}"
    if database_required
      yaml['items'][0]['spec']['template']['spec']['containers'].append(add_database(database_required, username))
    end
    yaml['items'][1]['metadata']['name'] = "#{name}-service"
    yaml['items'][1]['spec']['selector']['app'] = "#{username}-#{name}"

    File.open("#{directory}/pod.yml", 'w+') { |f| YAML.dump(yaml, f) }
  end

  def add_database(db, name)
    case db
    when 'postgres'
      port = 5432
      name += '-postgres'
      image = 'postgres'
    when 'mysql'
      port = 3306
      name += '-mysql'
      image = 'mysql'
    else
      return
    end
    { 'name' => name.to_s, 'image' => image.to_s,
      'ports' => [{ 'containerPort' => port, 'name' => "#{image}-port" }] }
  end

end
