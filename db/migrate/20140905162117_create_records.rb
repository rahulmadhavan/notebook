class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.date :date
      t.string :who
      t.string :start
      t.string :stop
      t.integer :interruptions
      t.string :question
      t.text :comments
      t.integer :assignment_id
      t.boolean :commit
      t.boolean :deleted, :default => false
      t.timestamps
    end
  end
end
