require 'pry'
require 'HTTParty'
require 'nokogiri'

class Gmvhra_crawler
  def self.scrape
    events_page = "https://www.gmvhra.org/events"
    unparsed_page = HTTParty.get(events_page)
    parsed_page = Nokogiri::HTML(unparsed_page)
    events_list = parsed_page.css('ul.boxesList')
    events = []

    events_list.css('li.boxesListItem').each do |row|
      event_name = row.css('a')[0].text
      event_date = row.css('div.eventInfoBoxValue')[0].text.strip
      event_time = row.css('div.eventInfoBoxValue')[1].text.strip
      event_address = row.css('div.eventInfoBoxValue')[2].text.strip
      event_description = row.css('div.gadgetEventEditableArea').text.strip

      puts event_name
      event = {
        name: event_name,
        date: event_date,
        time: event_time,
        address: event_address,
        description: event_description
      }

      events.push(event)
    end
    binding.pry
  end
end

Gmvhra_crawler.scrape
