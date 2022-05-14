# frozen_string_literal: true

require 'kubeclient'

module K8s
	def self.show_pods
		client = Kubeclient::Client.new('http://localhost:8080/api', 'v1')
		pp client.get_pods
		client.get_pods
	end
end