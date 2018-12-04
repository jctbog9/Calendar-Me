require 'pry'
require 'HTTParty'
require 'nokogiri'

class Nehra_crawler
  def self.scrape
    events_page = "https://www.nehra.com/events/event_list.asp"
    unparsed_page = HTTParty.get(events_page)
    parsed_page = Nokogiri::HTML(unparsed_page)
    events_list = parsed_page.css('table')[1]
    anchor_counter = 3
    events = []

    events_list.css('a').each do |row|
      if row.attributes['href'].value != '#'
        event_path = row.attributes['href'].value
        event_url = "https://www.nehra.com#{event_path}"
        event_unparsed_page = HTTParty.get(event_url)
        event_parsed_page = Nokogiri::HTML(event_unparsed_page)
        event_title = event_parsed_page.css('table')[0]
        event_name = event_title.css('tr')[0].text.strip
        event_info = event_parsed_page.css('table')[1]
        event_date = event_info.css('td')[2].text.strip
        event_time = event_info.css('td')[4].text.strip
        event_address = event_info.css('td')[6].text.strip
        event_description = event_info.css('td')[11].text.strip

        puts event_name
        puts event_date
        puts event_time
        puts event_address
        puts event_description
        puts "\n\n-------------------------------------------------\n\n"

        event = {
          name: event_name,
          date: event_date,
          time: event_time,
          address: event_address,
          description: event_description
        }
        events.push(event)
      end
      anchor_counter += 1
    end
  end
end

Nehra_crawler.scrape
