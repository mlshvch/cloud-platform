module Mutations
  class Create < BaseMutation
    # TODO: define return fields
    field :status, Boolean, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    def resolve
      { status: true }
    end
  end
end
