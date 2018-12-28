class Api::V1::TestController < ApplicationController
  def index
    render json: User.all
  end
end
