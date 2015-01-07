class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags, id: false do |t|
      t.string :id, null: false
      t.string :label
      t.text :description

      t.timestamps null: false
    end
    add_index :tags, :id, unique: true
  end
end
