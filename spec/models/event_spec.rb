require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should have_valid(:name).when("Event Name") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:address).when("Event Address") }
  it { should_not have_valid(:address).when(nil, "") }

  it { should have_valid(:city).when("Event City") }
  it { should_not have_valid(:city).when(nil, "") }

  it { should have_valid(:state).when("Event State") }
  it { should_not have_valid(:state).when(nil, "") }

  it { should have_valid(:zip).when("Event Zip") }
  it { should_not have_valid(:zip).when(nil, "") }

  it { should have_valid(:date).when("Event Date") }
  it { should_not have_valid(:date).when(nil, "") }

  it { should have_valid(:start_time).when("Event Start") }
  it { should_not have_valid(:start_time).when(nil, "") }

  it { should have_valid(:description).when("Event Description") }
  it { should_not have_valid(:description).when(nil, "") }
end
