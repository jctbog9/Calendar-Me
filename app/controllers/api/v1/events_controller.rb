class Api::V1::EventsController < ApplicationController
  attr_reader :rendered_events
  protect_from_forgery unless: -> {request.format.json?}

  def index
    @events = Event.all
    @rendered_events = []
    @events.each do |event|
      signups = event.signups
      if signups.where(user_id: current_user.id).length == 0 && Date.parse(event.date) > Date.today
        @rendered_events << event
      end
    end
    @rendered_events = @rendered_events.sort_by{|event| event.date}
    render json: @rendered_events
  end

  def create
    Event.find_or_create_by(event_params)
    render json: Event.all
  end

  def search
    if params[:search_field] != ""
      @events = Event.where("name ILIKE ? OR location ILIKE ? OR organizer ILIKE ?",
                          "%#{params[:search_field]}%",
                          "%#{params[:search_field]}%",
                          "%#{params[:search_field]}%")
    else
      @events = Event.all
      @rendered_events = []
      @events.each do |event|
        signups = event.signups
        if signups.where(user_id: current_user.id).length == 0
          @rendered_events << event
        end
      end
      @events = @rendered_events.sort_by{|event| event.date}
    end
    render json: @events
  end

  private

  def event_params
    params.require(:event).permit(:name, :organizer, :location, :date, :time, :url)
  end

end
