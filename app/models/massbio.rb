require 'nokogiri'
require 'HTTParty'
require 'pry'


class MassBio
  def self.scrape
    events_page = "https://www.massbio.org/events/listing"
    unparsed_page = HTTParty.get(events_page)
    page = Nokogiri::HTML(unparsed_page)
    events = page.css("div.Primary-Info")
    massbio_events = []
    per_page = events.count
    total = 

    events.each do |event|
      event_name = event.css("a.Listing-Title.Listing-Link").text.strip
      path = event.css("a.Listing-Title")[0].attributes["href"].value
      event_url = "https://www.massbio.org#{path}"
      date = event.css("span.Property.date")[0].text.strip
      event_date = Date.parse(date)
      event_time = ""

      if !event.css("span.Property.time")[0] && !event.css("span.Property.time")[1]
        event_time = "Time not specified"
      elsif !event.css("span.Property.time")[1]
        start_time = event.css("span.Property.time")[0].text.strip
        event_time = "#{start_time} - Unspecified"
      elsif !event.css("span.Property.time")[0]
        end_time = event.css("span.Property.time")[1].text.strip
        event_time = "Unspecified - #{end_time}"
      else
        start_time = event.css("span.Property.time")[0].text.strip
        end_time = event.css("span.Property.time")[1].text.strip
        event_time = "#{start_time} - #{end_time}"
      end
      location = event.css("address.Address").text.gsub(/\s+/, " ")

      # Event.find_or_create_by(name: event_name, date: event_date.strftime("%-m/%-d/%Y"), time: event_time, location: location, url: event_url)

      puts event_url
    end
  end
end

MassBio.scrape
