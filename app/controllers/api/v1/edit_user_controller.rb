class Api::V1::EditUserController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def index
    render json: current_user
  end

  def create
    @user = current_user
    @user.password = password_params["password"]
    @user.save
  end

  private

  def password_params
    params.permit(:password)
  end

end
