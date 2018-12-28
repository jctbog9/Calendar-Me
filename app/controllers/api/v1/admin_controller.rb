class Api::V1::AdminController < ApplicationController
  def index
    render json: User.all
  end

  def create
    new_user = User.new(admin_params)
    new_user.password = "#{new_user.first_name}#{new_user.last_name}"

    if new_user.save!
			render json: User.all
		else
			render json: {error: new_user.errors.full_messages.join(', ') }, status: :unprocessable_entity
		end
  end

  private

  def admin_params
    params.require(:admin).permit(:email, :first_name, :last_name, :business_phone, :personal_phone, :role)
  end

end
