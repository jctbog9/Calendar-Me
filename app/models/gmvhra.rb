require 'nokogiri'

class Gmvhra
  def self.scrape
    events_page = "https://www.gmvhra.org/events"
    unparsed_page = HTTParty.get(events_page)
    parsed_page = Nokogiri::HTML(unparsed_page)
    events_list = parsed_page.css('ul.boxesList')

    events_list.css('li.boxesListItem').each do |row|
      if row.css('div.eventInfoBoxValue')[2].text.include? ","
        event_name = row.css('a')[0].text
        event_url = row.css('a')[0].attributes["href"].value
        date = row.css('div.eventInfoBoxValue')[0].text.strip
        event_date = Date.parse(date)
        event_time = row.css('div.eventInfoBoxValue')[1].text.strip
        event_location = row.css('div.eventInfoBoxValue')[2].text.strip

        Event.find_or_create_by(name: event_name, organizer: "GMVHRA", date: event_date.strftime("%Y-%m-%d"), time: event_time, location: event_location, url: event_url)
      end
    end
  end
end
