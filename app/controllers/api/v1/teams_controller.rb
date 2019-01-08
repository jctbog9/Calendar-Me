class Api::V1::TeamsController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def index
    @teams = Team.all
    render json: @teams
  end

  def create
    Team.find_or_create_by(team_params)
    render Team.all
  end

  private

  def team_params
    params.require(:team).permit(:name)
  end

end
