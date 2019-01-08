class AddOrganizerToEvents < ActiveRecord::Migration[5.2]
  def up
    add_column :events, :organizer, :string, default: "No organizer provided"
  end
  def down
    remove_column :events, :organizer
  end
end
