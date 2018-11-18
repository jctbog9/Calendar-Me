require 'rails_helper'
require_relative '../../app/models/user'

describe User do
  it {should have_valid(:first_name).when("John")}
  it {should_not have_valid(:first_name).when(nil, "")}

  it {should have_valid(:last_name).when("Smith")}
  it {should_not have_valid(:last_name).when(nil, "")}

  it {should have_valid(:email).when("user1@gmail.com")}
  it {should_not have_valid(:email).when(nil, "")}

  it {should have_valid(:password).when("123456")}
  it {should_not have_valid(:password).when(nil, "")}

  it {should have_valid(:business_phone).when("6175555555")}
  it {should_not have_valid(:business_phone).when(nil, "")}

  it {should have_valid(:role).when("member")}
  it {should_not have_valid(:role).when(nil, "")}
end
