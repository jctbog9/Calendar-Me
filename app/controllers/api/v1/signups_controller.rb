class Api::V1::SignupsController < ApplicationController

  def create
    @signup = Signup.new(signup_params)
  end

  private

  def signup_params
    params.permit(:user_id, :event_id)
  end
end
