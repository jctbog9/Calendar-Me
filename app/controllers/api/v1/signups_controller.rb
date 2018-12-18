class Api::V1::SignupsController < ApplicationController

  def index
    render json: current_user.signups
  end

end
