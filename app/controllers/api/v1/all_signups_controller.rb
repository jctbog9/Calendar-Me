class Api::V1::AllSignupsController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def index
    render json: Signup.all
  end

  def create
    Signup.find_or_create_by!(signup_params)
  end

  private

  def signup_params
    params.permit(:user_id, :event_id)
  end

end
