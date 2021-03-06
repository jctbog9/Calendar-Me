require 'httparty'

class Eventbrite

  def self.scrape
    @event_data = HTTParty.get("https://www.eventbriteapi.com/v3/events/search/?location.address=boston&subcategories=2003%2C2001%2C2002&search_type=networking&token=W6RPJZTBWTTQMJUDOSCB")
    @event_data['events'].each do |event|
      time = Time.parse(event['start']['utc']).getutc.strftime("%I:%M")
      end_time = Time.parse(event['end']['utc']).getutc.strftime("%I:%M")
      eventData = {
        name: event['name']['text'],
        description: event['description']['text'],
        time: time,
        date: event['start']['utc'],
        url: event['url'],
        event_id: event['id']
      }
      Event.create!(eventData)
    end
  end
end
