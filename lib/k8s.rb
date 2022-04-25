require 'kubeclient'

module K8s
	CLIENT = Kubeclient::Client.new 'http://127.0.0.1:8080/api', 'v1'

	def create_pod

	end

	def show_pods
		CLIENT.get_pods
	end
end