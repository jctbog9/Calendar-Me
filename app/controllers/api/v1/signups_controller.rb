class Api::V1::SignupsController < ApplicationController

  def index
    render json: current_user.signups
  end

  def destroy
    @destroy_signup = Signup.where(user_id: current_user.id, event_id: params[:id])
    @destroy_signup[0].destroy
  end

end
