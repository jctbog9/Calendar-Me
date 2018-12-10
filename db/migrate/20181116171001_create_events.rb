class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :address, null: false, default: 'No Address Provided'
      t.string :city, null: false, default: 'No Address Provided'
      t.string :state, null: false, default: 'No Address Provided'
      t.string :zip, null: false, default: 'No Address Provided'
      t.date :date, null: false
      t.string :time, null: false
      t.string :end_time
      t.string :description
      t.string :ticket_price
      t.boolean :all_day, null: false, default: false
      t.string :url
      t.string :logo
      t.string :event_id, null: false
      
      t.timestamps null: false
    end
  end
end
