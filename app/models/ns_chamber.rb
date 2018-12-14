require 'pry'
require 'nokogiri'
require 'HTTParty'

class NsChamber
  def self.scrape
    events_page = "https://www.northshorechamber.org/programs-events/default.html"
    unparsed_page = HTTParty.get(events_page)
    parsed_page = Nokogiri::HTML(unparsed_page)
    events_list = parsed_page.css("dl")[1]
    events = events_list.css("a")
    events.pop

    events.each do |event|
      event_url = event.attributes["href"].value

      binding.pry
    end

  end
end

NsChamber.scrape
