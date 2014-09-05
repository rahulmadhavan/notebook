class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.date :date
      t.string :who
      t.timestamp :start
      t.timestamp :stop
      t.integer :interruptions
      t.string :question
      t.text :comments
      t.integer :assignment_id
      t.boolean :commit
      t.timestamps
    end
  end
end
