class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.string :token
      t.string :title
      t.text :description
      t.datetime :date
      t.string :image
      t.string :video

      t.timestamps null: false
    end
    add_index :media, [:token]
  end
end
