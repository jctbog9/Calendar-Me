class AddAllDayColToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :all_day, :boolean, null: false, default: false
  end
end
