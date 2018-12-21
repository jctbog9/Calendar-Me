class Api::V1::EventsController < ApplicationController
  def index
    @events = Event.all
    @rendered_events = []
    @events.each do |event|
      signups = event.signups
      if signups.where(user_id: current_user.id).length == 0
        @rendered_events << event
      end
    end
    render json: @rendered_events
  end

  def create
    @event = Event.new(event_params)
  end

  private

  def event_params
    params.require(:event).permit(:name, :address, :city, :state, :zip, :date, :time, :end_time, :description, :ticket_price, :logo, :url, :all_day)
  end

end
