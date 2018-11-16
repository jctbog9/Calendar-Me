class AddTeamToUsers < ActiveRecord::Migration[5.2]
  def up
    add_reference :users, :team, foreign_key: true
  end

  def down
    remove_reference :users, :team
  end
end
