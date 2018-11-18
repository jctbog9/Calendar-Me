class Signup < ApplicationRecord
  validates_presence_of :user_id, :event_id

  belongs_to :user
  belongs_to :event
end
