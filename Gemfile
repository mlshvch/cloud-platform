source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.5'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

gem 'rubocop', '>= 1.26'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'bullet', '~> 6.1', '>= 6.1.5'
  gem 'devise', '~> 4.8', '>= 4.8.1'
  gem 'devise_token_auth'
  gem 'graphql', '~> 1.12'
  gem 'graphql_devise', '~> 0.18.2'
  gem 'graphql_rails', '~> 2.2'
  gem 'omniauth', '~> 2.0', '>= 2.0.4'
  gem 'pry', '~> 0.13.0'
  gem 'pry-byebug', '~> 3.9'
  gem 'pry-rails', '~> 0.3.9'
  gem 'rubocop-graphql', '~> 0.13.0'
  gem 'rubocop-rails', '~> 2.13', '>= 2.13.2'
  gem 'rubocop-rspec', '~> 2.9'
  gem 'secure_headers', '~> 6.3', '>= 6.3.3'
end

group :development do
  gem 'graphql-docs', '~> 2.1'
  gem 'listen', '~> 3.3'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :test do
  gem 'rspec', '~> 3.11'
  gem 'rspec-core', '~> 3.11'
  gem 'rspec-expectations', '~> 3.11'
  gem 'rspec-rails', '~> 5.1', '>= 5.1.1'
  gem 'simplecov', '~> 0.21.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
