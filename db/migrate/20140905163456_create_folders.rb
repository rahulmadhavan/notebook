class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      t.string :name
      t.string :subject
      t.boolean :deleted, :default => false
      t.timestamps
    end
  end
end
