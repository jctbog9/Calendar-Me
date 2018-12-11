require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should have_valid(:name).when("Event Name") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:date).when("Event Date") }
  it { should_not have_valid(:date).when(nil, "") }

  it { should have_valid(:time).when("Event Start") }
  it { should_not have_valid(:time).when(nil, "") }

end
