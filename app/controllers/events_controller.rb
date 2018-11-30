class EventsController < ApplicationController
  def index
    @events = Event.all
    @events_list = []
    events_data = HTTParty.get("https://www.eventbriteapi.com/v3/events/search/?location.address=boston&subcategories=2003%2C2001%2C2002&search_type=networking&token=#{ENV["EVENTBRITE_ANON_API_KEY"]}")
    events_data['events'].each do |event|
      @events_list << event
    end
  end

  def show
    @event = Event.find(params['id'])
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      flash[:notice] = "Event Added!"
      render events_path
    else
      flash[:notice] = @event.errors.full_messages.join(' | ')
      render events_path
    end
  end


  private

  def event_params
    params.require(:event).permit(:name, :address, :city, :state, :zip, :date, :start_time, :end_time, :description, :ticket_price)
  end
end
