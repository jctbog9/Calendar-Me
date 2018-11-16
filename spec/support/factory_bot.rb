require 'factory_bot'

FactoryBot.define do
  factory :team do
    name { 'Team' }
  end

  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    first_name { 'John' }
    last_name { 'Smith' }
    business_phone { '1234567890' }
    team_id { 1 }
  end

end
