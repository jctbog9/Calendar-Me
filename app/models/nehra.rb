require 'pry'
require 'HTTParty'
require 'nokogiri'

class Nehra
  def self.scrape
    events_page = "https://www.nehra.com/events/event_list.asp"
    unparsed_page = HTTParty.get(events_page)
    parsed_page = Nokogiri::HTML(unparsed_page)
    unparsed_events_list = parsed_page.css('table')[1]
    events_list = unparsed_events_list.css('a')
    events_list.pop
    events = []

    events_list.each do |row|
      if row.attributes['href'].value != '#'
        event_path = row.attributes['href'].value
        event_url = "https://www.nehra.com#{event_path}"
        event_unparsed_page = HTTParty.get(event_url)
        event_parsed_page = Nokogiri::HTML(event_unparsed_page)
        event_info = event_parsed_page.css('table')[1]
        event_title = event_parsed_page.css('table')[0]
        event_name = event_title.css('tr')[0].text.strip
        event_info = event_parsed_page.css('table')[1]
        event_date = event_info.css('td')[2].text.strip
        unparsed_time = event_info.css('td')[4].text.strip
        find_colon = unparsed_time.index(':')
        find_am = unparsed_time.index('am')
        find_am = unparsed_time.index('pm')
        time_start = ""
        event_time = ""
        if find_am === nil
          find_am = unparsed_time.index('AM')
        end
        find_pm = unparsed_time.index('pm')
        if find_pm === nil
          find_pm = unparsed_time.index('PM')
        end
        if find_colon != nil
          if unparsed_time[find_colon - 6] === "2"
            time_start = find_colon - 2
            event_time = unparsed_time[time_start, time_start + 1]
          else
            time_start = find_colon - 1
            event_time = unparsed_time[time_start, time_start + 1]
          end
        elsif find_colon === nil && find_am != nil
          if unparsed_time[find_am - 6] === "2"
            time_start = find_am - 2
            event_time = unparsed_time[time_start, time_start + 1]
          else
            time_start = find_am - 1
            event_time = unparsed_time[time_start, time_start + 1]
          end
        elsif find_colon === nil && find_am === nil && find_pm != nil
          if unparsed_time[find_pm - 6] === "2"
            time_start = find_pm - 2
            event_time = unparsed_time[time_start, time_start + 1]
          else
            time_start = find_pm - 1
            event_time = unparsed_time[time_start, time_start + 1]
          end
        else
          event_time = "Time not specified"
        end
        event_address = event_info.css('td')[6]
        event_location = ""
        info_counter = 0
        if event_address.children[0].text.strip === "Online"
          event_location = "Online"
        elsif event_address.children[0].text.strip != "Online" && event_address.children[3].text.strip === ""
          while info_counter < 8
            event_details = event_address.children[info_counter].text.strip
            event_location += "#{event_details} "
            info_counter += 2
          end
        else
          info_counter = 3
          while info_counter < 12
            event_details = event_address.children[info_counter].text.strip
            event_location += "#{event_details} "
            info_counter += 2
          end
        end
        event_location_name =
        event_description = event_info.css('td')[11].text.strip

        event = {
          name: event_name,
          date: event_date,
          time: event_time,
          location: event_location,
          description: event_description,
          url: event_url
        }
        events.push(event)
      end
    end
    parsed_events = []
    events.each do |event|
      if !event[:date].include? "to"
        parsed_events.push(event)
      end
    end
    # parsed_events.each do |event|
    #   puts event
    #   puts "\n\n-------------------------------------\n\n"
    # end
    return parsed_events
  end
end

Nehra.scrape
