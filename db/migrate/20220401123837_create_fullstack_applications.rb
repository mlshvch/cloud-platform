class CreateFullstackApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :fullstack_applications do |t|
      t.string :source

      t.timestamps
    end
  end
end
