class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :date, :time, :description, :url, :event_id
end
