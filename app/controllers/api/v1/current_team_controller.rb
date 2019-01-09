class Api::V1::CurrentTeamController < ApplicationController
  def index
    render json: current_user.team.users
  end

end
