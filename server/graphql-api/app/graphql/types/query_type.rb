# frozen_string_literal: true

require 'k8s'

module Types
	# QueryType Class
	class QueryType < Types::BaseObject
		# Add `node(id: ID!) and `nodes(ids: [ID!]!)`
		include GraphQL::Types::Relay::HasNodeField
		include GraphQL::Types::Relay::HasNodesField

		field :services, [ServiceType]
		field :job, String do
			argument :id, String, required: true
		end

		field :k8s, String

		def services
			Service.all
		end

		def job(id:)
			Redis.new.get("sidekiq_job_#{id}")
		end

		def k8s
			K8s.show_pods
		end

	end
end
