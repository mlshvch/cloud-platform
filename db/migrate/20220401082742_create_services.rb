class CreateServices < ActiveRecord::Migration[6.1]
  def change
    create_table :services do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, limit: 30
      t.string :endpoint
      t.bigint :serviceable_id
      t.string :serviceable_type
      t.integer :state
      t.integer :access

      t.timestamps
    end

    add_index :services, :name, unique: true
    add_index :services, :endpoint, unique: true
  end
end
