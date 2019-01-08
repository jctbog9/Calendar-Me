class Api::V1::EventsController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def index
    @events = Event.all
    @rendered_events = []
    @events.each do |event|
      signups = event.signups
      if signups.where(user_id: current_user.id).length == 0
        @rendered_events << event
      end
    end
    render json: @rendered_events.sort_by{|event| event.date}
  end

  def create
    Event.find_or_create_by(event_params)
    render Event.all
  end

  private

  def event_params
    params.require(:event).permit(:name, :location, :date, :time, :url)
  end

end
