class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :label
      t.string :slug, unique: true
      t.text :description

      t.timestamps null: false
    end
  end
end
