class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media, id: false do |t|
      t.string :id, null: false
      t.string :title
      t.string :source
      t.text :description

      t.timestamps null: false
    end
    add_index :media, :id, unique: true
  end
end
