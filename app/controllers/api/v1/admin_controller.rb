class Api::V1::AdminController < ApplicationController
  def index
    render json: User.all
  end

  private

  def event_params
    params.require(:event).permit(:name, :address, :city, :state, :zip, :date, :time, :end_time, :description, :ticket_price, :logo, :url, :all_day)
  end

end
