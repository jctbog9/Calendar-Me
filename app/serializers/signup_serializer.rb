class SignupSerializer < ActiveModel::Serializer
  attributes :id, :user_id

  belongs_to :event
end
