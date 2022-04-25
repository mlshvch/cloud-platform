class AddUsernameToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string, null: true
    add_columns :users, :first_name, :last_name, type: :string, null: false, default: ''
  end
end
