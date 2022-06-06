module Mutations
  class CreateService < BaseMutation
    field :pid, String, null: false

    argument :repo, String, required: true
    argument :name, String, required: false
    argument :database, String, required: false
    argument :type, String, required: true
    argument :tech, String, required: true

    def resolve(**params)
      params[:uid] = context[:current_resource].id
      pp params
      { pid: ConfigureServiceJob.perform_async(params) }
    end
  end
end
