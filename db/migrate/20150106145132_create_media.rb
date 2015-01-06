class CreateMedia < ActiveRecord::Migration
  def change
    create_table :media do |t|
      t.string :medium_id
      t.string :title
      t.string :source
      t.text :description

      t.timestamps null: false
    end
  end
end
