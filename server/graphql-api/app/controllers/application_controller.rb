# frozen_string_literal: true

class ApplicationController < ActionController::API
  include GraphqlDevise::SetUserByToken

  def my_action
    result = CloudPlatformSchema.execute(params[:query], context: gql_devise_context(User))
    render json: result unless performed?
  end

  rescue_from Docker::Error, with: :docker_error

  private

  def docker_error
    render json: 'Docker Image Error', status: :not_implemented
  end
end
