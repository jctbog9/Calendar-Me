class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.string :date, null: false
      t.string :start_time, null: false
      t.string :end_time, null: false
      t.string :description, null: false
      t.string :ticket_price, null: false

      t.timestamps null: false
    end
  end
end
