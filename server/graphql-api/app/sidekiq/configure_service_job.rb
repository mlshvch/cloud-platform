# frozen_string_literal: true

# Background job to configure Service
class ConfigureServiceJob
  include Sidekiq::Job

  def perform(klass)
    case klass.class
    when FullstackApplication
      setup_fullstack_app(klass)
    else
      raise StandardError
    end
  end

  private

  def setup_fullstack_app(klass)
    service = Kubeclient::Resource.new(
      apiVersion: 'v1',
      metadata: {
        name: klass.service.name,
      },
      selector: {
        app: 'MyApp'
      },
      ports: {
        protocol: 'TCP',
        port: 80,
        targetPort: 9376
      }
    )

  end

end
