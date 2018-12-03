class Api::V1::EventsController < ApplicationController
  def index
    render json: Event.all
  end

  def create
  end
  
end
