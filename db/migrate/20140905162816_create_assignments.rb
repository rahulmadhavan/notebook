class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.string :name
      t.integer :folder_id
      t.boolean :deleted, :default => false
      t.timestamps
    end
  end
end
