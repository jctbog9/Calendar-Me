class EventsController < ApplicationController
  before_action :authenticate_user!
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
    params.require(:event).permit(:name, :address, :city, :state, :zip, :date, :time, :end_time, :description, :ticket_price, :logo, :url, :all_day)
  end
end
