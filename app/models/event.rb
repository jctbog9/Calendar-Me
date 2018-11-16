class Event < ApplicationRecord
  validates_presence_of :name, :address, :city, :state, :zip, :date, :start_time, :description

  has_many :signups
  has_many :users, through: :signups

end
