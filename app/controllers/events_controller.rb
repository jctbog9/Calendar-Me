class EventsController < ApplicationController
  def index
    @events = Event.all
    @events_list = []
    events_data = HTTParty.get("https://www.eventbriteapi.com/v3/events/search/?location.address=boston&subcategories=2003%2C2001%2C2002&search_type=networking&token=W6RPJZTBWTTQMJUDOSCB")
    events_data['events'].each do |event|
      @events_list << event
    end
  end
end
