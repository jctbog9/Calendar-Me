require 'nokogiri'

class Massbio
  def self.scrape
    events_page = "https://www.massbio.org/events/listing"
    unparsed_page = HTTParty.get(events_page)
    parsed_page = Nokogiri::HTML(unparsed_page)
    events = parsed_page.css("div.Primary-Info")
    page = 1
    per_page = events.count
    total = parsed_page.css("span.Range-Total")[0].text.strip.to_i
    last_page = (total.to_f / per_page.to_f).ceil

    while page <= last_page
      pagination_url = "https://www.massbio.org/events/listing?eventHost=all&page=#{page}"
      pagination_unparsed_page = HTTParty.get(pagination_url)
      pagination_parsed_page = Nokogiri::HTML(pagination_unparsed_page)
      pagination_events = pagination_parsed_page.css("div.Primary-Info")
      pagination_events.each do |event|
        if !event.css("span.Property.date")[1]
          event_name = event.css("a.Listing-Title.Listing-Link").text.strip
          path = event.css("a.Listing-Title")[0].attributes["href"].value
          if path.include? 'http'
            event_url = path
          else
            event_url = "https://www.massbio.org#{path}"
          end
          binding.pry
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
          event_location = event.css("address.Address").text.gsub(/\s+/, " ")

          Event.find_or_create_by(name: event_name, date: event_date.strftime("%Y-%m-%d"), time: event_time, location: event_location, url: event_url)
        end
      end
    page += 1
    end
  end
end
