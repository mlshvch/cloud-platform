class AddStateToFullstackApplication < ActiveRecord::Migration[6.1]
  def change
    add_column :fullstack_applications, :state, :integer
  end
end
