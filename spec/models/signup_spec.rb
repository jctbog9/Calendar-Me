require 'rails_helper'
require_relative '../../app/models/signup'

describe Signup do
  it {should have_valid(:user_id).when(10)}
  it {should_not have_valid(:user_id).when(nil, "")}

  it {should have_valid(:event_id).when(10)}
  it {should_not have_valid(:event_id).when(nil, "")}
end
