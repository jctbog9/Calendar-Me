class Api::V1::EventsController < ApplicationController
  def index
    Nehra.scrape

    render json: Event.all
  end

  def create
    @event = Event.new(event_params)
  end

  private

  def event_params
    params.require(:event).permit(:name, :address, :city, :state, :zip, :date, :time, :end_time, :description, :ticket_price, :logo, :url, :all_day)
  end

end
