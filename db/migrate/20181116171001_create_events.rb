class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :location, default: 'No Address Provided'
      t.string :date, null: false
      t.string :time, null: false
      t.string :description
      t.string :ticket_price
      t.string :url, null: false
      t.string :logo
      t.bigint :event_id

      t.timestamps null: false
    end
  end
end
