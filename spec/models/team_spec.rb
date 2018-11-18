require 'rails_helper'
require_relative '../../app/models/team'

describe Team do
  it {should have_valid(:name).when("Alpha")}
  it {should_not have_valid(:name).when(nil, "")}
end
