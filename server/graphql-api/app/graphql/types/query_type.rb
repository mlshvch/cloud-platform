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
			[
				{
					id: 4,
					name: "demo_app",
					technology: "Ruby on Rails",
					serviceable_type: 'FullStack Application',
					state: "suspended",
					access: 'public',
					endpoint: "10.106.119.102:30090"
				},
				{
					id: 7,
					name: "news_portal",
					technology: "Ruby on Rails",
					serviceable_type: 'FullStack Application',
					state: "suspended",
					access: 'private',
					endpoint: "10.106.114.122:32343"

				},
				{
					id: 10,
					name: "social_app",
					technology: "Node.js",
					serviceable_type: 'FullStack Application',
					state: "running",
					access: 'private',
					endpoint: "10.106.108.100:31540"

				}
			]
		end

		def job(id:)
			Redis.new.get("sidekiq_job_#{id}")
		end

		def k8s
			K8s.show_pods
		end

	end
end
