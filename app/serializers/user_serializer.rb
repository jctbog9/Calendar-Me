class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :business_phone, :personal_phone, :role

  has_many :events
end
